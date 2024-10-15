import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Input from '@/components/common/Input/Input';
import Button from '@/components/common/Button/Button';
import CheckBox from '@/components/common/CheckBox/CheckBox';
import { termsOfUseList, registerInputList } from '@/pages/AdminHome/formFieldsData';
import { RegisterUserFormTypes } from './AdminHome.types';
import { register } from '@/apis/user.api';
import { SubText } from '@/components/common/Input/Input.types';

// 임시로 정해둔 에러 텍스트 및 조건
const WARN_EMPTY = '비어있는 칸을 채워주세요.';
const WARN_EMAIL_FORM = '옳바르지 않은 이메일 형식입니다.';
const WARN_PW_FORM = '비밀번호는 6자리 이상입니다.';

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
  const [warnTexts, setWarnTexts] = useState<SubText[]>(Array(3).fill({ text: '', warn: true }));

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
    // TODO: 체크리스트 및 이메일, 패스워드, 닉네임 규칙 확인
    // 임시로 정해둔 규칙 확인
    const { email, password, nickname } = registerForm;
    const checkList = [false, false, false];

    // 에러 텍스트 초기화
    setWarnTexts(prev => prev.map(subText => ({ ...subText, text: '' })));

    // 이메일 규칙 확인
    if (email === '') {
      setWarnTexts(prev =>
        prev.map((subText, i) => {
          if (i === 0) {
            return { ...subText, text: WARN_EMPTY };
          }
          return subText;
        })
      );
      checkList[0] = false;
    } else if (!email.match(/^[\w]+@[\w]+\.[\w]{2,}$/gi)) {
      setWarnTexts(prev =>
        prev.map((subText, i) => {
          if (i === 0) return { ...subText, text: WARN_EMAIL_FORM };
          return subText;
        })
      );
      checkList[0] = false;
    } else {
      checkList[0] = true;
    }

    // 비밀번호 규칙 확인
    if (password === '') {
      setWarnTexts(prev =>
        prev.map((subText, i) => {
          if (i === 1) {
            return { ...subText, text: WARN_EMPTY };
          }
          return subText;
        })
      );
      checkList[1] = false;
    } else if (!password.match(/^[\w]{6,}$/g)) {
      setWarnTexts(prev =>
        prev.map((subText, i) => {
          if (i === 1) {
            return { ...subText, text: WARN_PW_FORM };
          }
          return subText;
        })
      );
      checkList[1] = false;
    } else {
      checkList[1] = true;
    }

    // 닉네임 규칙 확인
    if (nickname === '') {
      setWarnTexts(prev =>
        prev.map((subText, i) => {
          if (i === 2) {
            return { ...subText, text: WARN_EMPTY };
          }
          return subText;
        })
      );
      checkList[2] = false;
    } else {
      checkList[2] = true;
    }

    if (checkList.every(check => check === true)) {
      // TODO: 회원가입 로직
      register(registerForm)
        .then(() => {
          navigate('/login');
        })
        .catch(() => {});
    }
    // TODO: /join api 전달 및 첫 /login으로 리다이렉트
  };

  return (
    <div className="flex w-[50%] flex-col items-center gap-6">
      {registerInputList.map((item, i) => (
        <div className="w-full max-w-[400px]" key={item.id}>
          <Input
            id={item.id}
            label={item.label}
            type={item.type}
            placeholder={item.placeholder}
            value={registerForm[item.id] as keyof RegisterUserFormTypes}
            handleInputChange={e => handleRegisterFormChange(e.target.id, e.target.value)}
            subText={warnTexts[i]}
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
