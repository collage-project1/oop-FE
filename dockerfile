# 베이스 이미지
FROM node:18

# 작업 디렉토리 설정
WORKDIR /app

# 의존성 파일 복사
COPY package.json package-lock.json ./

# 의존성 설치
RUN npm install

# 프로젝트 파일 복사
COPY . .

# React 앱 실행
CMD ["npm", "start"]

# 컨테이너가 사용하는 기본 포트
EXPOSE 3000