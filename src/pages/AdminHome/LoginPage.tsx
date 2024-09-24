import { useNavigate } from 'react-router-dom';
import Button from '@/components/common/Button/Button';
import Input from '@/components/common/Input/Input';

export default function LoginPage() {
  const navigate = useNavigate();

  const handleNavigate = (src: string) => {
    // TODO: 로그인 버튼을 통한 접속에 대한 처리가 필요함.
    // TODO: 성공적으로 로그인되었을 떄, 사용자가 첫 사용인지 체크.
    // TODO: navigate options에 처음 사용자인지(등록한 가게가 있는지)에 대한 결과 전달
    navigate(`/${src}`);
  };
  return (
    <div className="flex w-[50%] flex-col items-center gap-6">
      <div className="w-full max-w-[400px]">
        <Input id="email" label="이메일" type="email" placeholder="이메일을 입력하세요." />
      </div>
      <div className="w-full max-w-[400px]">
        <Input
          id="password"
          label="비밀번호"
          type="password"
          placeholder="비밀번호를 입력하세요."
        />
      </div>
      <Button title="로그인" type="others" onClick={() => handleNavigate('admin/manage')} />
      <div className="flex cursor-pointer gap-4 text-d900">
        <span className="underline hover:font-bold">비밀번호를 잃어버리셨나요 ?</span>
        <span className="underline hover:font-bold" onClick={() => handleNavigate('register')}>
          회원가입
        </span>
      </div>
    </div>
  );
}
