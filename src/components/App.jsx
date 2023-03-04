import React, { useState, useEffect } from 'react';
import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';
import { Button } from './Button';
import { Loader } from './Loader';
import { ToastContainer, toast, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { animateScroll as scroll } from 'react-scroll';
import { getRandomHexColor } from 'utils/getRandomHexColor';
import pixabayApi, { per_page } from 'services/pixabay-api';
import css from './App.module.css';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

const ToastOptions = {
  autoClose: 1500,
  pauseOnFocusLoss: true,
  transition: Flip,
};

export function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [totalHits, setTotalHits] = useState(0);
  const [status, setStatus] = useState(Status.IDLE);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  
  useEffect(() => {    
    const getImagesFetch = async () => {
      if (!searchQuery) {
        return;
      }

      setIsLoading(true);      
  
      try {      
        const { totalHits, hits } = await pixabayApi.fetchPixabayPhoto(searchQuery, page);        

        if (hits.length === 0) {
          setTimeout(() => {
            toast.warning('Sorry, there are no images matching your search query.', ToastOptions);
          }, 100)
          return setStatus(Status.IDLE);        
        }

        if (hits.length > 0) {   
          setImages(prevState => [...prevState, ...hits]);
          setStatus(Status.RESOLVED);
          setTotalHits(totalHits);          
        };
      } catch (error) {
        if (error.message.length < 25) {
          toast.error(`Something went wrong... Details: ${error.message}`, ToastOptions);
        } else {
          setError(error);
          setStatus(Status.REJECTED);        
        };
      } finally {
        setIsLoading(false);      
      };
    };    

    getImagesFetch();
  }, [page, searchQuery]);  

  useEffect(() => {
    if (images.length > 0) { 
      setTimeout(() => { 
        toast.success(`Total ${totalHits} / Displayed ${images.length}`, ToastOptions);
      }, 100); 
    };
  }, [images.length, totalHits]);  

  const handleSearchFormSubmit = ({ searchQuery }) => {    
    if (searchQuery.trim() === '') {
      setTimeout(() => {
        toast.info('Your query is empty, please enter data to search.', ToastOptions);
      }, 100)
      return setStatus(Status.IDLE);   
    };

    setSearchQuery(searchQuery);
    setImages([]);
    setPage(1);
    setStatus(Status.PENDING);    
  };

  const onloadMore = () => {    
    setPage(prevState => prevState + 1);    
    scrollGalleryOnLoadMoreBtn();
  };

  const scrollGalleryOnLoadMoreBtn = () => {
    scroll.scrollToBottom();
  };    

  // IDLE
  if (status === 'idle') {
    return (
      <div className={css.App}>
        <div className={css.SearchbarBox} style={{ backgroundColor: getRandomHexColor() }}>
          <Searchbar onSubmit={handleSearchFormSubmit} />
        </div>
        
        <ToastContainer />
      </div>
    )
  };    

  // PENDING
  if (status === 'pending') {      
    return (
      <div className={css.App}>
        <div className={css.SearchbarBox} style={{ backgroundColor: getRandomHexColor() }}>
          <Searchbar onSubmit={handleSearchFormSubmit} />            
        </div>          
        
        <ImageGallery images={images} page={page} />                 
        
        {isLoading
            ? <Loader />
            : <Button onloadMore={onloadMore} />}          
        
        <ToastContainer />
      </div>
    )
  };    
  
  // RESOLVED
  if (status === 'resolved') {      
    return (
      <div className={css.App}>
        <div className={css.SearchbarBox} style={{ backgroundColor: getRandomHexColor() }}>
          <Searchbar onSubmit={handleSearchFormSubmit} />           
        </div> 

        {isLoading && <Loader />}

        <ImageGallery images={images} page={page} />          

        {totalHits > per_page && totalHits > images.length && (
          !isLoading && <Button onloadMore={onloadMore} />
        )}
        
        <ToastContainer />
      </div>
    )
  };
  
  // REJECTED
  if (status === 'rejected') {
    return (
      <div className={css.App}>
        <div className={css.SearchbarBox} style={{ backgroundColor: getRandomHexColor() }}>
          <Searchbar onSubmit={handleSearchFormSubmit} />
        </div>

        <div className={css.ErrorMessage}>
          <p>{`${error}. Please try again later.`}</p>            
        </div>

        <ToastContainer />
      </div>
    )
  };  
};