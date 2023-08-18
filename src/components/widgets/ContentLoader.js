import CircularProgress from '@mui/material/CircularProgress';

const ContentLoader = () => {
  return (
    <div className='loader-wrapper'>
      <div className='loader-style'>
        <CircularProgress size={70} thickness={1.5} />
      </div>
    </div>
  );
};
export default ContentLoader;
