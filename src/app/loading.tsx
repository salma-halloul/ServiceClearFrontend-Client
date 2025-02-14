"use client"
import { useEffect, useState } from 'react';
import Loader from '@/components/Loader';

const Loading = () => {
   const [loading, setLoading] = useState<boolean>(true);
 
   useEffect(() => {
     setTimeout(() => setLoading(false), 1000);
   }, []);


  return (
    <>
      {loading  && (
        <div>
          <Loader />
        </div>
      )}
    </>
  );
};

export default Loading;
