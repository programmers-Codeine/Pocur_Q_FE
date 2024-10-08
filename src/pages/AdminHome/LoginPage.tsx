import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Button from '@/components/common/Button/Button';
import Input from '@/components/common/Input/Input';
import { loginInputList } from '@/pages/AdminHome/formFieldsData';
import { UserLoginFormTypes } from './AdminHome.types';
import { login } from '@/apis/user.api';
import useUserStore from '@/stores/useUserStore';

export default function LoginPage() {
  const [loginForm, setLoginForm] = useState<UserLoginFormTypes>({
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const { setLoginFirst } = useUserStore();

  const handleNavigate = (src: string) => {
    // TODO: 로그인 버튼을 통한 접속에 대한 처리가 필요함.
    // TODO: 성공적으로 로그인되었을 떄, 사용자가 첫 사용인지 체크.
    // TODO: navigate options에 처음 사용자인지(등록한 가게가 있는지)에 대한 결과 전달
    navigate(`/${src}`);
  };
  const handleLogin = () => {
    //TODO response에 대한 타입 처리
    login(loginForm)
      .then((res: { message: string; isFirstLogin: boolean }) => {
        if (res.isFirstLogin) {
          setLoginFirst(true);
          navigate('/admin/manage');
        } else {
          setLoginFirst(false);
          navigate('/admin/manage/table');
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleInputChange = (id: string, value: string) => {
    setLoginForm(prev => ({ ...prev, [id]: value }));
  };

  return (
    <div className="flex w-[50%] flex-col items-center gap-6">
      {loginInputList.map(({ id, label, type, placeholder }) => (
        <div className="w-full max-w-[400px]" key={id}>
          <Input
            id={id}
            label={label}
            type={type}
            placeholder={placeholder}
            value={loginForm[id as keyof UserLoginFormTypes]}
            handleInputChange={e => handleInputChange(id, e.target.value)}
          />
        </div>
      ))}
      <Button title="로그인" type="others" onClick={handleLogin} />
      <div className="flex cursor-pointer gap-4 text-d900">
        <span className="underline hover:font-bold">비밀번호를 잃어버리셨나요 ?</span>
        <span className="underline hover:font-bold" onClick={() => handleNavigate('register')}>
          회원가입
        </span>
      </div>
    </div>
  );
}
