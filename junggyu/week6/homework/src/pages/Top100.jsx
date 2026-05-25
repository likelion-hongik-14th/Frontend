const top30Movies = [
  { rank: 1, title: "멀홀랜드 드라이브", year: 2001 },
  { rank: 2, title: "화양연화", year: 2000 },
  { rank: 3, title: "데어 윌 비 블러드", year: 2007 },
  { rank: 4, title: "센과 치히로의 행방불명", year: 2001 },
  { rank: 5, title: "보이후드", year: 2014 },
  { rank: 6, title: "이터널 선샤인", year: 2004 },
  { rank: 7, title: "트리 오브 라이프", year: 2011 },
  { rank: 8, title: "하나 그리고 둘", year: 2000 },
  { rank: 9, title: "씨민과 나데르의 별거", year: 2011 },
  { rank: 10, title: "노인을 위한 나라는 없다", year: 2007 },
  { rank: 11, title: "인사이드 르윈", year: 2013 },
  { rank: 12, title: "조디악", year: 2007 },
  { rank: 13, title: "칠드런 오브 맨", year: 2006 },
  { rank: 14, title: "액트 오브 킬링", year: 2012 },
  { rank: 15, title: "4개월, 3주... 그리고 2일", year: 2007 },
  { rank: 16, title: "홀리 모터스", year: 2012 },
  { rank: 17, title: "판의 미로", year: 2006 },
  { rank: 18, title: "하얀 리본", year: 2009 },
  { rank: 19, title: "매드 맥스: 분노의 도로", year: 2015 },
  { rank: 20, title: "시네도키, 뉴욕", year: 2008 },
  { rank: 21, title: "그랜드 부다페스트 호텔", year: 2014 },
  { rank: 22, title: "사랑도 통역이 되나요?", year: 2003 },
  { rank: 23, title: "히든", year: 2005 },
  { rank: 24, title: "마스터", year: 2012 },
  { rank: 25, title: "메멘토", year: 2000 },
  { rank: 26, title: "25시", year: 2002 },
  { rank: 27, title: "소셜 네트워크", year: 2010 },
  { rank: 28, title: "그녀에게", year: 2002 },
  { rank: 29, title: "월-E", year: 2008 },
  { rank: 30, title: "올드보이", year:2003}];

const Top100 = () => {
    return(
        <div className="px-12">
            <h1 className="text-3xl font-bold py-6">Top 100 영화</h1>
            <a href="https://www.bbc.com/culture/article/20160819-the-21st-centurys-100-greatest-films" target="_blank" rel="noreferrer" className=" text-xl inline-block hover:scale-110 hover:text-gray-400">
                  👉 "더 확인하고 싶으면 클릭" 👈
            </a>
            <div className="py-2">
                {top30Movies.map((movie) => (
                    <p key={`${movie.rank}-${movie.title}`}>
                        {movie.rank}위 - {movie.title} ({movie.year})
                    </p>
                ))}
            </div>
        </div>
    )
}


export default Top100