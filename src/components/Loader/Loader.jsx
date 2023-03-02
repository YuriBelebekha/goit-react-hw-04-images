import { InfinitySpin } from 'react-loader-spinner';
// import { getRandomHexColor } from 'utils/getRandomHexColor';
import css from './Loader.module.css';

export const Loader = () => {
  return (
    <div className={css.Loader}>
      <InfinitySpin
        width='150'        
        color='grey'
      />
    </div>
  );
};