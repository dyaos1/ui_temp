import Spinner from 'react-bootstrap/Spinner';

function LoadingMark() {
  return (
    <div className="flex flex-col items-center">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
      <p>로딩 중...</p>
    </div>
  );
}

export default LoadingMark;