import styled from 'styled-components';
import CafeDetail from './CafeDetail';
import { useEffect, useState } from 'react';
import { BsShare, BsHeart, BsFillStarFill, BsHeartFill } from 'react-icons/bs';

const SearchCafeList = ({ searchCafeData }) => {
  const [isOpenArray, setIsOpenArray] = useState([]);
  const [isLike, setIsLike] = useState([]);

  console.log(searchCafeData);

  //좋아요 클릭시 백에 데이터 전송
  const handleLikeClick = i => {
    const cafeId = searchCafeData[i].id;
    const account = '';
    fetch(`${process.env.REACT_APP_API_URL}/favorites/${cafeId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        // token: refreshToken,
      },
      body: JSON.stringify({
        account: '', //Q.account가 필요한가? 토큰으로 알 수 있지않나?
        cafe_id: cafeId,
      }),
    }).then(res => {
      if (res.message === 'ADD_FAVORITES_SUCCESS') {
        setIsLike(prevLikes => {
          const newLikes = [...prevLikes];
          newLikes[i] = !newLikes[i];
          return newLikes;
        });
      } else {
        console.error('좋아요 기능 실패');
      }
    }, []);
  };

  //좋아요 해제시 백에 데이터 전송
  // const handleDisLike = cafe_id => {
  // fetch(`${process.env.REACT_APP_API_URL}/likes/${id}`, {
  //   method: 'DELETE',
  //   headers: {
  //     'Content-Type': 'application/json;charset=utf-8',
  //     token: refreshToken,
  //   },
  // });
  // };

  // 공유하기 클릭시 카페 주소 복사(카페 사이트가 있으면 준다는데 데이터 들어오는거 봐야알듯)
  //const handleOnClikck =() => {}

  const toggleChange = id => {
    setIsOpenArray(prevArray => {
      const newArray = [...prevArray];
      newArray[id] = !newArray[id];
      return newArray;
    });
  };

  return (
    <CafeListBody>
      <NearCafeBox> 24시 카페 목록 </NearCafeBox>
      <ScrollList>
        {searchCafeData?.map(el => {
          const isScore = el.score !== null;
          return (
            <ColumnBody key={el.cafe_id}>
              <DataBox>
                <CafeInfoBody>
                  <CafeMainImage src={el.cafe_thumbnail} alt="카페메인이미지" />
                  <CafeInfoBox>
                    <CafeName>가게 이름: {el.cafe_name}</CafeName>
                    <CafeAddress>가게 주소: {el.cafe_address}</CafeAddress>
                    {isScore ? (
                      <CafeRating>
                        <StarIcon /> {parseFloat(el.score).toFixed(1)}
                      </CafeRating>
                    ) : (
                      ''
                    )}
                  </CafeInfoBox>
                </CafeInfoBody>
                <SocialBox>
                  <ShareIcon />
                  {isLike[el.cafe_id] ? (
                    <FillLikeIcon onClick={() => handleLikeClick(el.cafe_id)} />
                  ) : (
                    <LikeIcon onClick={() => handleLikeClick(el.cafe_id)} />
                  )}
                </SocialBox>
              </DataBox>
              {isOpenArray[el.cafe_id] ? (
                <OpenToggle>
                  <p onClick={() => toggleChange(el.cafe_id)}>▼ 상세정보</p>
                  <CafeDetail
                    cafePhotos={el.cafe_photos}
                    searchCafeData={searchCafeData}
                  />
                </OpenToggle>
              ) : (
                <ClosedToggle>
                  <p onClick={() => toggleChange(el.cafe_id)}> ▶️ 상세정보 </p>
                </ClosedToggle>
              )}
            </ColumnBody>
          );
        })}
      </ScrollList>
    </CafeListBody>
  );
};

export default SearchCafeList;

const CafeListBody = styled.div`
  background-color: #f7f0e0c9;
`;

const NearCafeBox = styled.h1`
  text-align: center;
  padding: 0.7em 0 0.4em 0;
  border-bottom: 2px solid #e9e0d3;
  color: ${props => props.theme.mainColor};
`;

const ScrollList = styled.div`
  overflow-y: auto;
  max-height: 700px;
`;

const ColumnBody = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1em 2em;
  border-bottom: 1px solid #e9e0d3;
`;

const DataBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CafeInfoBody = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const CafeMainImage = styled.img`
  width: 6em;
  height: 6em;
  border-radius: 0.5em;
  margin: 1em;
`;

const CafeInfoBox = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 6em;
  font-size: 1.1em;
  padding: 1em 0 0 1.5em;
  gap: 10px;
`;

const CafeName = styled.li``;

const CafeAddress = styled.li``;

const CafeRating = styled.li`
  display: flex;
  gap: 5px;
`;

const SocialBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-right: 1em;
  gap: 40px;
`;

const StarIcon = styled(BsFillStarFill)`
  color: #ffdb3a;
`;

const ShareIcon = styled(BsShare)`
  color: ${props => props.theme.mainColor};
  width: 1.3em;
  height: 1.3em;
  cursor: pointer;
`;

const LikeIcon = styled(BsHeart)`
  color: ${props => props.theme.mainColor};
  width: 1.5em;
  height: 1.6em;
  cursor: pointer;
`;

const FillLikeIcon = styled(BsHeartFill)`
  width: 1.5em;
  height: 1.6em;
  color: #eb3b3b;
`;

const ClosedToggle = styled.div`
  margin: 0 1em;
  cursor: pointer;
`;

const OpenToggle = styled.div`
  padding: 0 1em;
  cursor: pointer;
`;
