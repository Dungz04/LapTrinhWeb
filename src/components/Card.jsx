import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

const Card = ({ data, media_type }) => {
  const imageURL = 'https://image.tmdb.org/t/p/w500'; // Base URL từ TMDB
  const mediaType = data.media_type ?? media_type;

  return (
    <Link
      to={`/${mediaType}/${data.id}`}
      className="w-full min-w-[230px] max-w-[230px] h-90 overflow-hidden block rounded relative hover:scale-105 transition-all"
    >
      {data?.poster_path ? (
        <img src={`${imageURL}${data.poster_path}`} alt={data.title || data.name} />
      ) : (
        <div className="bg-neutral-800 h-full w-full flex justify-center items-center">
          Không có hình ảnh
        </div>
      )}

      <div className="absolute bottom-0 h-24 backdrop-blur-3xl w-full bg-black/60 !p-2">
        <h2 className="text-ellipsis line-clamp-2 text-base font-semibold text-white">
          {data?.title || data?.name}
        </h2>
        <div className="text-sm text-neutral-400 flex justify-between items-center !mt-1">
          <p>
            {moment(data.release_date || data.first_air_date).format('MMMM Do YYYY')}
          </p>
          <p className="bg-black !px-2 !py-2 rounded-xl text-xs text-white">
            Rating: {Number(data.vote_average).toFixed(1)}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Card;