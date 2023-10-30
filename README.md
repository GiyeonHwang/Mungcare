# 5ver-clock
<div align=center>
<br>
<img width="300" src="https://github.com/5ver-clock/5ver-clock/blob/main/5ver-clock-frontend/5ver-clock-info/assets/images/mung.jpg?raw=true"/>

<br>
</div>

## 프로젝트 소개
전국에서 반려동물을 기르고 있는 가구는 591가구로 80만 가구가 늘었다. 전체 가구 중 26.4%까지 오름
반려동물을 기르는 가구가 증가하는 만큼 반려동물을 자신, 내 가족처럼 아끼는 펫미족과 펫팸족이 늘어나면서 반려동물을 위한 관심도가 높아짐. 
매일 같은 루틴으로 산책을 하다 보면 보호자는 재미도 의욕도 떨어지게 된다. 산책으로 재미를 느낄 수 있고 기록하고 반려동물과 보호자 모두에게 도움이 될 수 있는 프로그램이 필요하다고 생각함

## 주요기능
- 게시판
  - 일반적인 게시판 기능 (CRUD)
- 캘린더
   - 산책하기, 놀기 페이지에서 반려동물과 했던 내용들을 기록함, 캘린더 API를 사용하여 사진 열람 및 기록
- 피부진단
   - 머신러닝 프로그램 API를 사용하여 데이터 학습하고 사진을 업로드하고 해당 사진을 분석하여 반려견의 피부 진단할 수 있다.
- 주변 MapInfo
  - 공간 정보 오픈 api를 사용하여 동물병원, 장묘업, 약국, 미용실, 위탁관리업 데이터를 수집한다.
  - 전화번호 데이터가 있으면 바로 전화할 수 있도록 휴대폰에 내장되어 있는 전화 앱과 연동한다.
  - 데이터를 가지고 버튼을 누르면 내 주변 해당 데이터의 목록을 가져오고 지도 상으로 마커를 찍음으로써 실직적인 위치를 판단할 수 있다.
  - 목록에서 원하는 장소를 클릭하면 해당 위치로 지도가 이동
- 산책하기
  - 사용자의 위도 경도값을 가져와서 현재 위치를 마커로 찍음
  - 산책한 경로, 시작 시간, 끝난 시간을 알 수 있다.
  - 산책을 종료하면 사진을 찍어 기록하고, 캘린더에서 확인 가능
- 같이 산책하기
  - 산책하기를 하면 함께 산책하기를 할 수 있다.
  - 내 주변에서 함께 산책하기를 누른 사람들의 위치와 정보를 볼 수 있따.
  - 공지를 올리면 내 주변에 있는 사람들에게 해당장소에서 같이 산책하자는 공지를 보낼 수 있다.(Web Socket)
- 산책 리뷰
  - 산책 장소를 리뷰할 수 있다.
  - 해당 장소에 마커를 찍고 사진을 올릴 수 있다.
  - 별점 및 리뷰 내용도 작성
- 랭킹
  - 가장 포인트가 많은 유저 3명의 포인트와 프로필 사진을 확인할 수 있다.
- 마이페이지
  - 반려동물을 추가할 수 있다.
  - 회원정보 수정

 ## DEVELOPER

 |      황기연      |          박상환         |       양연지         |       류희정         |       정보현         |                                                                                                                
| :------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |  :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|  <img width="128px" src="https://github.com/5ver-clock/5ver-clock/assets/95736504/d6195deb-95ef-4c66-8617-abc2ffe90043" />  |        <img width="128px" src="https://user-images.githubusercontent.com/95736504/278948762-925f6cf6-e3a1-4d1d-a228-0c2d5a0f0ef9.jpg" />       |      <img width="128px" src="https://user-images.githubusercontent.com/95736504/278948764-a2f60603-3f17-4536-89d7-e1095da2bf3a.png" />      |      <img width="128px" src="https://user-images.githubusercontent.com/95736504/278948759-1bb5de22-7084-44cf-a323-62500b0ba41f.jpg" />     |  <img width="128px" src="https://user-images.githubusercontent.com/95736504/278948752-3ab52dbc-adb3-42d8-bb08-74b990107fd0.jpg"/>     |
|   [@GiyeonHwang](https://github.com/GiyeonHwang)    |    [@pshhhhhhhhhh](https://github.com/pshhhhhhhhhh)  | [@yeonji123](https://github.com/yeonji123)  | [@rhj7513](https://github.com/rhj7513)  | [@JBH-0](https://github.com/JBH-0) |
| 선문대학교 컴퓨터공학부 3학년 | 선문대학교 컴퓨터공학부 3학년 | 선문대학교 컴퓨터공학부 3학년 | 선문대학교 컴퓨터공학부 3학년 | 선문대학교 컴퓨터공학부 3학년 |

  ## 📚 STACKS

### FrontEnd
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)

### BackEnd
![Java](https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white)

### FrameWork
![React Native](https://img.shields.io/badge/react_native-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
<img src="https://img.shields.io/badge/spring boot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white">

### Library
![Expo](https://img.shields.io/badge/expo-1C1E24?style=for-the-badge&logo=expo&logoColor=#D04A37)
![KakaoTalk](https://img.shields.io/badge/kakaotalk-ffcd00.svg?style=for-the-badge&logo=kakaotalk&logoColor=000000)

### Tool
![IntelliJ IDEA](https://img.shields.io/badge/IntelliJIDEA-000000.svg?style=for-the-badge&logo=intellij-idea&logoColor=white)
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)

### DB
![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)
### 화면
| 메인 | 게시판 | 글 | 댓글 |
| :------------: | :------------: |:------------:|:------------:|
|<img src="https://github.com/5ver-clock/5ver-clock/assets/95736504/acc6b621-9db7-4cfc-8ce6-92193733fa8d" width="250" height="300"/>|<img src="https://github.com/5ver-clock/5ver-clock/assets/95736504/8b0d508b-1b6e-48bb-ad40-b0a72fe8995b" width="250" height="300"/>)|<img src="https://github.com/5ver-clock/5ver-clock/assets/95736504/7cfe1f0d-d7cc-4a93-9e76-dc8f583d8782" width="250" height="300"/>|<img src="https://github.com/5ver-clock/5ver-clock/assets/95736504/35baef2b-f9c8-488d-898e-546926f1a433" width="250" height="300"/>|
| 캘린더 | 피부진단 | 피부진단 결과 | MapInfo |
|<img src="https://github.com/5ver-clock/5ver-clock/assets/95736504/5645aa6b-f0a3-4360-908f-745c7d6631ad" width="250" height="300"/>|<img src="https://github.com/5ver-clock/5ver-clock/assets/95736504/881cf5fe-2ee7-498a-8060-1af98cee4b41" width="250" height="300"/>|<img src="https://github.com/5ver-clock/5ver-clock/assets/95736504/bacec2b4-745c-4a6f-a3e5-2ef1ce2473ca" width="250" height="300"/>|<img src="https://github.com/5ver-clock/5ver-clock/assets/95736504/fc755384-46d7-4cea-8fa2-a30175b6bf6c" width="250" height="300"/>|
| MapInfo 마커 | 산책하기 | 함께산책 | 함께산책위치지정 |
|<img src="https://github.com/5ver-clock/5ver-clock/assets/95736504/40fdc5d2-4e83-4be8-82f1-ccbe854daf8d" width="250" height="300"/>|<img src="https://github.com/5ver-clock/5ver-clock/assets/95736504/14c05ae0-5652-44d8-b8bf-0f71aa3a6b5f" width="250" height="300"/>|<img src="https://github.com/5ver-clock/5ver-clock/assets/95736504/e42a1c71-3b67-449e-8fd8-5db64c7126d5" width="250" height="300"/>|<img src="https://github.com/5ver-clock/5ver-clock/assets/95736504/1d409e42-f04e-41da-8581-09d7fdfce162" width="250" height="300"/>|
| 리뷰 | 놀아주기 | 랭킹 | 알람 |
|<img src="https://github.com/5ver-clock/5ver-clock/assets/95736504/1e918be1-ff2f-4d29-936c-8d5f4a2efd0f" width="250" height="300"/>|<img src="https://github.com/5ver-clock/5ver-clock/assets/95736504/6e28f54b-62a6-4eb7-ab73-c05d4bad3fb2" width="250" height="300"/>|<img src="https://github.com/5ver-clock/5ver-clock/assets/95736504/ce37eb20-b958-4b7e-80b2-d46343b7c4ef" width="250" height="300"/>|<img src="https://github.com/5ver-clock/5ver-clock/assets/95736504/14795b93-6706-467a-b5b0-8b6f1e99af58" width="250" height="300"/>|

### 추가자료
요구사항 정의서 : [5ver-clock_요구사항정의서.docx](https://github.com/5ver-clock/5ver-clock/files/13201553/5ver-clock_.docx)















