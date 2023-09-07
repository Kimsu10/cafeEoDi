import { styled } from 'styled-components';

const UserSidebar = ({ setIsLeftOpen }) => {
  return (
    <BodyBox>
      <SlideBox>
        <CloseBtn onClick={() => setIsLeftOpen(false)}>✕</CloseBtn>
        <InitSlideBox>
          <SignupBtn>회원가입</SignupBtn>
          <SignInBtn>로그인</SignInBtn>
        </InitSlideBox>
        <LoginedSlideBox>
          <UserBox>
            <LikeBtn>즐겨찾기</LikeBtn>
            <LogOutBtn>로그아웃</LogOutBtn>
          </UserBox>
          <WithdrawBox>
            <WithdrawBtn>회원탈퇴 🚮</WithdrawBtn>
          </WithdrawBox>
        </LoginedSlideBox>
      </SlideBox>
    </BodyBox>
  );
};

export default UserSidebar;

const BodyBox = styled.div``;

const SlideBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 570px;
  height: 100vh;
  background-color: #d2eaf7;
  position: absolute;
  top: 0;
  left: 0;
  padding: 1em;
  border-radius: 0 0.7em 0.7em 0;
`;

const CloseBtn = styled.button`
  display: flex;
  justify-content: flex-end;
`;

/**
 * 지나가는 유저가 눌렀을 때 나타날 요소들
 */
const InitSlideBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const SignupBtn = styled.button``;

const SignInBtn = styled.button``;

/**
 * login시 보여줄 요소들의 CSS
 */
const LoginedSlideBox = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const UserBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const LikeBtn = styled.button``;

const LogOutBtn = styled.button``;

const WithdrawBox = styled.div`
  display: flex;
  height: 100%;
  flex-direction: row-reverse;
  align-items: flex-end;
  padding: 2em;
`;

const WithdrawBtn = styled.button``;