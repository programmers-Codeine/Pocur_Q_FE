import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Input from '@/components/common/Input/Input';
import Button from '@/components/common/Button/Button';
import CheckBox from '@/components/common/CheckBox/CheckBox';
import { termsOfUseList, registerInputList } from '@/pages/AdminHome/formFieldsData';
import { RegisterUserFormTypes } from './AdminHome.types';

export default function RegisterPage() {
  const [agreeList, setAgreeList] = useState<Record<string, boolean>>(() => {
    return termsOfUseList.reduce(
      (acc, { id }) => ({
        ...acc,
        [id]: false,
      }),
      {} as Record<string, boolean>
    );
  });

  const [registerForm, setRegisterForm] = useState<RegisterUserFormTypes>({
    email: '',
    password: '',
    nickname: '',
  });

  const navigate = useNavigate();

  const handleRegisterFormChange = (id: string, value: string) => {
    setRegisterForm(prev => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleAgreeChange = (id: string) => {
    setAgreeList(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const sendRegisterForm = () => {
    // TODO: 회원가입 로직
    // TODO: 체크리스트 및 이메일, 패스워드, 닉네임 규칙 확인
    // TODO: /join api 전달 및 첫 /login으로 리다이렉트
  };

  return (
    <div className="flex w-[50%] flex-col items-center gap-6">
      {registerInputList.map(item => (
        <div className="w-full max-w-[400px]" key={item.id}>
          <Input
            id={item.id}
            label={item.label}
            type={item.type}
            placeholder={item.placeholder}
            value={registerForm[item.id] as keyof RegisterUserFormTypes}
            handleInputChange={e => handleRegisterFormChange(e.target.id, e.target.value)}
          />
        </div>
      ))}
      <div className="max-w-[400px]">
        {termsOfUseList.map(item => (
          <CheckBox
            key={item.id}
            id={item.id}
            label={item.label}
            isBold={item.isBold}
            onChange={handleAgreeChange}
            checked={agreeList[item.id]}
          />
        ))}
      </div>
      <Button title="회원가입" type="others" onClick={sendRegisterForm} />
      <div className="flex cursor-pointer gap-4 text-d900">
        <span className="underline hover:font-bold" onClick={() => navigate('/login')}>
          로그인으로 이동
        </span>
      </div>
    </div>
  );
}
