import React, { useEffect, useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import tmdbApi from '../service/tmdbApi'; // Giữ đường dẫn import của bạn
import Card from '../components/Card';

const ExplorePage = () => {
  const location = useLocation();
  const [pageNo, setPageNo] = useState(1);
  const [data, setData] = useState([]);
  const [totalPageNo, setTotalPageNo] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Ánh xạ route với loại nội dung
  const getContentType = () => {
    switch (location.pathname) {
      case '/phim-moi':
        return { type: 'movie', fetchMethod: tmdbApi.getNowPlayingContent };
      case '/phim-bo':
        return { type: 'tv', fetchMethod: tmdbApi.getNowPlayingContent };
      case '/phim-le':
        return { type: 'movie', fetchMethod: tmdbApi.getTrendingByDay };
      default:
        return { type: 'movie', fetchMethod: tmdbApi.getNowPlayingContent };
    }
  };

  const { type, fetchMethod } = getContentType();
  const pageTitle = {
    '/phim-moi': 'Phim Mới Đang Chiếu',
    '/phim-bo': 'Phim Bộ Đang Phát',
    '/phim-le': 'Phim Lẻ Nổi Bật',
  }[location.pathname];

  const fetchData = useCallback(async () => {
    if (pageNo > totalPageNo && totalPageNo !== 0) return; // Ngăn gọi API khi hết trang
    setLoading(true);
    try {
      const response = await fetchMethod(type); // pageNo không cần thiết vì API đã xử lý trong tmdbApi
      setData((prev) => [...prev, ...response]);
      setTotalPageNo(response.total_pages || 100); // TMDB trả total_pages, mặc định 100 nếu không có
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }, [pageNo, totalPageNo, type, fetchMethod]);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
      !loading &&
      pageNo < totalPageNo
    ) {
      setPageNo((prev) => prev + 1);
    }
  }, [loading, pageNo, totalPageNo]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    setPageNo(1);
    setData([]);
    setTotalPageNo(0);
    fetchData();
  }, [location.pathname]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll); // Dọn dẹp sự kiện
  }, [handleScroll]);

  if (error) return <div className="text-center text-red-500 py-16">Lỗi: {error}</div>;

  return (
    <div className="py-16">
      <div className="container mx-auto">
        <h3 className="capitalize text-lg lg:text-xl font-semibold my-3">{pageTitle}</h3>
        <div className="grid grid-cols-[repeat(auto-fit,230px)] gap-6 justify-center lg:justify-start">
          {data.map((exploreData, index) => (
            <Card
              data={exploreData}
              key={`${exploreData.id}-explore-${index}`}
              media_type={type}
            />
          ))}
        </div>
        {loading && (
          <div className="flex justify-center items-center h-24">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
          </div>
        )}
        {pageNo >= totalPageNo && data.length > 0 && (
          <p className="text-center text-gray-400 mt-6">Đã tải hết nội dung</p>
        )}
      </div>
    </div>
  );
};

export default ExplorePage;