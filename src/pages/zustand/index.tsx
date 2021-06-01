import useTokenStore from '../../stores/useTokenStore';

const ZustandPage = () => {
  const { authToken, setAuthToken } = useTokenStore();

  return (
    <div>
      {authToken}
      <button
        type="button"
        onClick={() => {
          setAuthToken('setAuthToken');
        }}
      >
        set
      </button>
    </div>
  );
};
export default ZustandPage;
