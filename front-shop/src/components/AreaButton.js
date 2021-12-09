import { Col, Row } from "react-bootstrap";

const AreaButton = (props) => {
    const { onChange, area } = props;
    return (
        <Row>
            <Col>
                <div className="dropdown">
                    <button
                        className="dropdown-button"
                        style={{ height: "auto", padding: 10 }}
                        onClick={(e) => {
                            e.preventDefault();
                        }}
                    >
                        {area}
                    </button>
                    <div
                        class="dropdown-content"
                        style={{ padding: 0, minWidth: 300 }}
                    >
                        <select
                            autofocus
                            style={{ width: 300 }}
                            onChange={onChange}
                        >
                            <optgroup label="서울">
                                <option value="서울 강남/역삼/삼성/논현">
                                    강남/역삼/삼성/논현
                                </option>
                                <option value="서울 서초/신사/방배">
                                    서초/신사/방배
                                </option>
                                <option value="서울 잠실/잠실새내">
                                    잠실/잠실새내
                                </option>
                                <option value="서울 신림/서울대/사당/동작">
                                    신림/서울대/사당/동작
                                </option>
                                <option value="서울 화곡/까치산/양천/목동">
                                    화곡/까치산/양천/목동
                                </option>
                                <option value="서울 신촌/홍대/합정">
                                    신촌/홍대/합정
                                </option>
                                <option value="서울 종로/대학로/동묘앞역">
                                    종로/대학로/동묘앞역
                                </option>
                                <option value="서울 이태원/용산/서울역/명동/회현">
                                    이태원/용산/서울역/명동/회현
                                </option>
                                <option value="서울 회기/고려대/청량리/신설동">
                                    회기/고려대/청량리/신설동
                                </option>
                                <option value="서울 건대/군자/구의">
                                    건대/군자/구의
                                </option>
                                <option value="서울 수유/미아">
                                    수유/미아
                                </option>
                                <option value="서울 태릉/노원/도봉/창동">
                                    태릉/노원/도봉/창동
                                </option>
                                <option value="서울 영등포/여의도">
                                    영등포/여의도
                                </option>
                                <option value="서울 천호/길동/둔촌">
                                    천호/길동/둔촌
                                </option>
                                <option value="서울 구로/금천/오류/신도림">
                                    구로/금천/오류/신도림
                                </option>
                                <option value="서울 연신내/불광/응암">
                                    연신내/불광/응암
                                </option>
                                <option value="서울 성신여대/성북/월곡">
                                    성신여대/성북/월곡
                                </option>
                                <option value="서울 동대문/을지로/충무로/신당/약수">
                                    동대문/을지로/충무로/신당/약수
                                </option>
                                <option value="서울 장안동/답십리">
                                    장안동/답십리
                                </option>
                                <option value="서울 왕십리/성수/금호">
                                    왕십리/성수/금호
                                </option>
                                <option value="서울 상봉/중랑/면목">
                                    상봉/중랑/면목
                                </option>
                            </optgroup>
                            <optgroup label="경기">
                                <option value="경기 수원 인계/권선/영통">
                                    수원 인계/권선/영통
                                </option>
                                <option value="경기 안양/평촌/인덕원/과천">
                                    안양/평촌/인덕원/과천
                                </option>
                                <option value="경기 용인">용인</option>
                                <option value="경기 하남/광주/여주/이천">
                                    하남/광주/여주/이천
                                </option>
                                <option value="경기 안산 고잔/상록수/선부동/월피동">
                                    고잔/상록수/선부동/월피동
                                </option>
                                <option value="경기 시흥/월곶">
                                    시흥/월곶
                                </option>
                                <option value="경기 평택/송탄/안성">
                                    평택/송탄/안성
                                </option>
                                <option value="경기 김포">김포</option>
                                <option value="경기 구리">구리</option>
                                <option value="경기 남양주(오남/조안/화도/진접)">
                                    남양주(오남/조안/화도/진접)
                                </option>
                                <option value="경기 양주/동두천/연천">
                                    양주/동두천/연천
                                </option>
                                <option value="경기 가평/청평">
                                    가평/청평
                                </option>
                                <option value="경기 수원역/구운/장안/세류">
                                    수원역/구운/장안/세류
                                </option>
                                <option value="경기 성남/분당/위례">
                                    성남/분당/위례
                                </option>
                                <option value="경기 동탄/화성/오산/병점">
                                    동탄/화성/오산/병점
                                </option>
                                <option value="경기 안산 중앙역">
                                    안산 중앙역
                                </option>
                                <option value="경기 군포/의왕/금정/산본">
                                    군포/의왕/금정/산본
                                </option>
                                <option value="경기 광명">광명</option>
                                <option value="경기 부천">부천</option>
                                <option value="경기 파주">파주</option>
                                <option value="경기 의정부">의정부</option>
                                <option value="경기 남양주(다산/별내/와부/호평)">
                                    남양주(다산/별내/와부/호평)
                                </option>
                                <option value="경기 포천">포천</option>
                                <option value="경기 양평">양평</option>
                                <option value="경기 제부도/대부도">
                                    제부도/대부도
                                </option>
                            </optgroup>
                            <optgroup label="인천">
                                <option value="인천 부평">부평</option>
                                <option value="인천 서구(석남,서구청,검단)">
                                    서구(석남,서구청,검단)
                                </option>
                                <option value="인천 주안">주안</option>
                                <option value="인천 인천공항/을왕리/영종도">
                                    인천공항/을왕리/영종도
                                </option>
                                <option value="인천 강화/옹진">
                                    강화/옹진
                                </option>
                                <option value="인천 남동구(소래포구/호구포)">
                                    남동구(소래포구/호구포)
                                </option>
                                <option value="인천 구월">구월</option>
                                <option value="인천 계양(작전,경인교대)">
                                    계양(작전,경인교대)
                                </option>
                                <option value="인천 송도/연수">
                                    송도/연수
                                </option>
                                <option value="인천 중구(월미도/신포/동인천/연안부두)">
                                    중구(월미도/신포/동인천/연안부두)
                                </option>
                                <option value="인천 동암/간석">
                                    동암/간석
                                </option>
                                <option value="인천 용현/숭의/도화/동구">
                                    용현/숭의/도화/동구
                                </option>
                            </optgroup>
                            <optgroup label="강원">
                                <option value="강원 춘천/강촌">
                                    춘천/강촌
                                </option>
                                <option value="강원 원주">원주</option>
                                <option value="강원 경포대/사천/주문진/정동진">
                                    경포대/사천/주문진/정동진
                                </option>
                                <option value="강원 영월/정선">
                                    영월/정선
                                </option>
                                <option value="강원 양양(서피비치/낙산)">
                                    양양(서피비치/낙산)
                                </option>
                                <option value="강원 화천/철원/인제/양구">
                                    화천/철원/인제/양구
                                </option>
                                <option value="강원 강릉역/교동/옥계">
                                    강릉역/교동/옥계
                                </option>
                                <option value="강원 속초/고성">
                                    속초/고성
                                </option>
                                <option value="강원 동해/삼척/태백">
                                    동해/삼척/태백
                                </option>
                                <option value="강원 홍천/횡성">
                                    홍천/횡성
                                </option>
                            </optgroup>
                            <optgroup label="제주">
                                <option value="제주 제주시/제주공항">
                                    제주시/제주공항
                                </option>
                                <option value="제주 서귀포시">서귀포시</option>
                                <option value="제주 하귀/애월/한림/협재">
                                    하귀/애월/한림/협재
                                </option>
                            </optgroup>
                            <optgroup label="대전">
                                <option value="대전 서구(둔산/용문/월평)">
                                    서구(둔산/용문/월평)
                                </option>
                                <option value="대전 유성구">유성구</option>
                                <option value="대전 중구(은행/대흥/선화/유천)">
                                    중구(은행/대흥/선화/유천)
                                </option>
                                <option value="대전 동구(용전/복합터미널)">
                                    동구(용전/복합터미널)
                                </option>
                                <option value="대전 대덕구(중리/신탄진)">
                                    대덕구(중리/신탄진)
                                </option>
                            </optgroup>
                            <optgroup label="충북">
                                <option value="충북 광산구">광산구</option>
                                <option value="충북 청주 홍덕구/서원구">
                                    청주 홍덕구/서원구
                                </option>
                                <option value="충북 청주 상당구/청원구">
                                    청주 상당구/청원구
                                </option>
                                <option value="충북 충주/수안보">
                                    충주/수안보
                                </option>
                                <option value="충북 제천/단양">
                                    제천/단양
                                </option>
                                <option value="충북 진천/음성">
                                    진천/음성
                                </option>
                                <option value="충북 보은/괴산/증평/영동">
                                    보은/괴산/증평/영동
                                </option>
                            </optgroup>
                            <optgroup label="충남/세종">
                                <option value="충남/세종 천안서북구">
                                    천안서북구
                                </option>
                                <option value="충남/세종 천안동남구">
                                    천안동남구
                                </option>
                                <option value="충남/세종 아산">아산</option>
                                <option value="충남/세종 공주/동학/세종">
                                    공주/동학/세종
                                </option>
                                <option value="충남/세종 계룡/금산/논산/청양">
                                    계룡/금산/논산/청양
                                </option>
                                <option value="충남/세종 예산/홍성">
                                    예산/홍성
                                </option>
                                <option value="충남/세종 당진">당진</option>
                                <option value="충남/세종 서천/부여">
                                    서천/부여
                                </option>
                                <option value="충남/세종 보령/대천해수욕장">
                                    보령/대천해수욕장
                                </option>
                                <option value="충남/세종 태안/안면도/서산">
                                    태안/안면도/서산
                                </option>
                            </optgroup>
                            <optgroup label="부산">
                                <option value="부산 해운대/센텀시티/재송">
                                    해운대/센텀시티/재송
                                </option>
                                <option value="부산 송정/기장/정관">
                                    송정/기장/정관
                                </option>
                                <option value="부산 광안리/수영">
                                    광안리/수영
                                </option>
                                <option value="부산 경성대/대연/용호동/문현">
                                    경성대/대연/용호동/문현
                                </option>
                                <option value="부산 서면/양정/초읍/부산시민공원">
                                    서면/양정/초읍/부산시민공원
                                </option>
                                <option value="부산 남포동/중앙동/태종대/송도/영도">
                                    남포동/중앙동/태종대/송도/영도
                                </option>
                                <option value="부산 부산역/범일동/부산진역">
                                    부산역/범일동/부산진역
                                </option>
                                <option value="부산 연산/토곡">
                                    연산/토곡
                                </option>
                                <option value="부산 동래/사직/온천장/부산대/구서/서동">
                                    동래/사직/온천장/부산대/구서/서동
                                </option>
                                <option value="부산 사상/엄궁/학장">
                                    사상/엄궁/학장
                                </option>
                                <option value="부산 덕천/화명/만덕/구포">
                                    덕천/화명/만덕/구포
                                </option>
                                <option value="부산 하단/명지/김해공항">
                                    하단/명지/김해공항
                                </option>
                                <option value="부산 다대포/강서/신호/과정/지사">
                                    다대포/강서/신호/과정/지사
                                </option>
                            </optgroup>
                            <optgroup label="광주">
                                <option value="광주 광산구">광산구</option>
                                <option value="광주 서구">서구</option>
                                <option value="광주 남구">남구</option>
                                <option value="광주 동구">동구</option>
                                <option value="대전 대덕구">대덕구</option>
                            </optgroup>
                            <optgroup label="울산">
                                <option value="울산 남구/중구">
                                    남구/중구
                                </option>
                                <option value="울산 동구/북구/울주군">
                                    동구/북구/울주군
                                </option>
                            </optgroup>
                            <optgroup label="경남">
                                <option value="경남 창원 상남동/용호동/중앙동">
                                    창원 상남동/용호동/중앙동
                                </option>
                                <option value="경남 창원 명서동/봉곡동/팔용동">
                                    창원 명서동/봉곡동/팔용동
                                </option>
                                <option value="경남 창원 북면온천/창원종합버스터미널">
                                    창원 북면온천/창원종합버스터미널
                                </option>
                                <option value="경남 마산">마산</option>
                                <option value="경남 진해">진해</option>

                                <option value="경남 김해/장유">
                                    김해/장유
                                </option>
                                <option value="경남 양산/밀양">
                                    김해/장유
                                </option>
                                <option value="경남 진주">김해/장유</option>

                                <option value="경남 거제/통영/고성">
                                    거제/통영/고성
                                </option>
                                <option value="경남 사천/남해">
                                    사천/남해
                                </option>
                                <option value="경남 하동/산청/함양">
                                    하동/산청/함양
                                </option>
                                <option value="경남 거창/함안/창녕/합천/의령">
                                    거창/함안/창녕/합천/의령
                                </option>
                            </optgroup>
                            <optgroup label="대구">
                                <option value="대구 동성로/서문시장/대구시청">
                                    동성로/서문시장/대구시청
                                </option>
                            </optgroup>
                            <optgroup label="경북">
                                <option value="경북 포항/남구">
                                    포항/남구
                                </option>
                                <option value="경북 포항/북구">
                                    포항/북구
                                </option>
                                <option value="경북 경주">경주</option>
                                <option value="경북 구미">구미</option>
                                <option value="경북 경산">경산</option>
                                <option value="경북 안동">안동</option>
                                <option value="경북 영천/청도">
                                    영천/청도
                                </option>
                                <option value="경북 김천/칠곡/성주">
                                    김천/칠곡/성주
                                </option>
                                <option value="경북 문경/상주/영주">
                                    문경/상주/영주
                                </option>
                                <option value="경북 예천/군위/의성/봉화">
                                    예천/군위/의성/봉화
                                </option>
                                <option value="경북 울진/영덕/청송">
                                    울진/영덕/청송
                                </option>
                                <option value="경북 울릉도">울릉도</option>
                            </optgroup>
                            <optgroup label="광주">
                                <option value="광주 상무지구/금호지구">
                                    상무지구/금호지구
                                </option>
                                <option value="광주 유스퀘어/서구">
                                    유스퀘어/서구
                                </option>
                                <option value="광주 첨단지구/하남지구">
                                    첨단지구/하남지구
                                </option>
                                <option value="광주 송정역/광산구">
                                    송정역/광산구
                                </option>
                                <option value="광주 충장로/대인시장">
                                    충장로/대인시장
                                </option>
                                <option value="광주 국립아시아문화전당">
                                    국립아시아문화전당
                                </option>
                                <option value="광주 광주역/전대사거리">
                                    광주역/전대사거리
                                </option>
                                <option value="광주 동구/남구">
                                    동구/남구
                                </option>
                                <option value="광주 기아챔피언스필드/북구">
                                    기아챔피언스필드/북구
                                </option>
                            </optgroup>
                            <optgroup label="전남">
                                <option value="전남 여수">여수</option>
                                <option value="전남 순천">순천</option>
                                <option value="전남 광양">광양</option>
                                <option value="전남 목포/무안/영암/신안">
                                    목포/무안/영암/신안
                                </option>
                                <option value="전남 나주/함평/영광/장성">
                                    나주/함평/영광/장성
                                </option>
                                <option value="전남 담양/곡성/화순/구례">
                                    담양/곡성/화순/구례
                                </option>
                                <option value="전남 해남/완도/진도">
                                    해남/완도/진도
                                </option>
                                <option value="전남 강진/장흥/보성/고흥">
                                    강진/장흥/보성/고흥
                                </option>
                            </optgroup>
                            <optgroup label="전주/전북">
                                <option value="전주/전북 덕진구">덕진구</option>
                                <option value="전주/전북 완산구">완산구</option>
                                <option value="전주/전북 군산">군산</option>
                                <option value="전주/전북 익산">익산</option>
                                <option value="전주/전북 남원/임실/순창">
                                    남원/임실/순창
                                </option>
                                <option value="전주/전북 무주/진안/장수">
                                    무주/진안/장수
                                </option>
                                <option value="전주/전북 정읍/부안/김제/고창">
                                    정읍/부안/김제/고창
                                </option>
                            </optgroup>
                        </select>
                    </div>
                </div>
            </Col>
        </Row>
    );
};

export default AreaButton;
