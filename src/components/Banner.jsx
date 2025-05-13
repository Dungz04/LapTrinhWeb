import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import tmdbApi from "../service/tmdbApi.jsx";

const Banner = () => {
    const [content, setContent] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const trendingData = await tmdbApi.getWeeklyTrending();
            const trendingMovies = trendingData.movies || [];
            const trendingTvShows = trendingData.tvShows || [];

            const combinedContent = [...trendingMovies, ...trendingTvShows];

            const getCertification = (releaseInfo, type) => {
                if (!releaseInfo) return "N/A";
                const priorityCountries = ["US", "GB", "VN"];
                for (const country of priorityCountries) {
                    const info = releaseInfo.find((r) => r.iso_3166_1 === country);
                    if (info) {
                        if (type === "movie" && info.release_dates?.[0]?.certification) {
                            return info.release_dates[0].certification;
                        } else if (type === "tv" && info.rating) {
                            return info.rating;
                        }
                    }
                }
                return "N/A";
            };

            const contentWithDetails = await Promise.all(
                combinedContent.map(async (item) => {
                    const type = item.media_type || (item.title ? "movie" : "tv");
                    const details = await tmdbApi.getContentDetails(item.id, type);
                    const releaseInfo = await tmdbApi.getContentReleaseInfo(item.id, type);
                    const certification = getCertification(releaseInfo, type);
                    const overview = details.overview ||
                        (await tmdbApi.getContentDetails(item.id, type, { language: "en-US" })).overview ||
                        "Không có mô tả";
                    return {
                        ...item,
                        ...details,
                        overview,
                        certification,
                        type,
                    };
                })
            );

            if (contentWithDetails.length > 0) {
                setContent(contentWithDetails);
                setCurrentIndex(0);
            }
            setIsLoading(false);
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (content.length === 0) return;

        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % content.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [content]);

    // Hàm xử lý chuyển hướng
    const handleWatchNow = () => {
        if (content[currentIndex]) {
            navigate(`/xem-phim/${content[currentIndex].id}`);
        }
    };

    const handleDetails = () => {
        if (content[currentIndex]) {
            navigate(`/phim/${content[currentIndex].id}`);
        }
    };

    // Skeleton UI khi đang tải
    if (isLoading) {
        return (
            <div className="relative w-full !min-h-screen !px-24 flex justify-start items-center bg-gray-600 animate-pulse">
                <div className="relative max-w-xl text-left text-white z-10">
                    <div className="w-3/4 h-10 bg-gray-400 rounded !mb-2"></div>
                    <div className="w-1/2 h-5 bg-gray-400 rounded !mb-4"></div>
                    <div className="w-2/5 h-4 bg-gray-400 rounded !mb-4"></div>
                    <div className="w-full h-16 bg-gray-400 rounded !mb-5"></div>
                    <div className="flex justify-end gap-4 !mt-4">
                        <div className="w-32 h-10 bg-gray-400 rounded"></div>
                        <div className="w-32 h-10 bg-gray-400 rounded"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (content.length === 0) return <div>Loading...</div>;

    const currentItem = content[currentIndex];
    const title = currentItem.title || currentItem.name;
    const year = (currentItem.release_date || currentItem.first_air_date)?.split("-")[0];
    const runtime = currentItem.type === "movie"
        ? currentItem.runtime
        : (currentItem.episode_run_time?.[0] || "N/A");

    return (
        <div
            className="relative w-full !min-h-screen !px-24 flex justify-start items-center bg-cover bg-center overflow-hidden transition-all duration-500 before:content-[''] before:absolute before:inset-0 before:bg-black/50 before:z-10"
            style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original${currentItem.backdrop_path})`,
            }}
        >
            <div className="relative max-w-xl text-left text-white z-20">
                <h1 className="!text-6xl !mb-2">{title}</h1>
                <h4 className="flex items-center gap-2 text-white/80 !text-2xl font-normal">
                    <span className="!px-4 !py-1 border-r border-white/50">{year || "N/A"}</span>
                    <span className="!px-4 !py-1 border-r border-white/50 text-red-600">{currentItem.vote_average?.toFixed(1) || "N/A"}</span>
                    <span className="!px-4 !py-1 border-r border-white/50">{runtime ? `${runtime} phút` : "N/A"}</span>
                    <span className="!px-2 !py-1 bg-red-600 text-white rounded">{currentItem.certification}</span>
                </h4>
                <p className="text-lg italic font-normal opacity-90 !mb-4 text-left">{currentItem.genres?.map((g) => g.name).join(" • ")}</p>
                <p className="text-base font-light leading-relaxed !my-4 text-justify">{currentItem.overview}</p>
                <div className="flex justify-end gap-4 !mt-4">
                    {/* Nút Xem ngay */}
                    <button
                        onClick={handleWatchNow}
                        className="relative overflow-hidden group !px-6 !py-3 !bg-red-600 text-white rounded-2xl font-semibold uppercase tracking-wide transition-all duration-300 ease-in-out hover:shadow-xl cursor-pointer"
                    >
                        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <span className="relative z-10 flex items-center gap-2">
                            <FontAwesomeIcon icon={faPlay} />
                            Xem ngay
                        </span>
                    </button>

                    {/* Nút Chi tiết */}
                    <button
                        onClick={handleDetails}
                        className="flex items-center gap-2 !px-6 !py-3 !bg-white/20 text-white border border-white/50 rounded-2xl font-semibold uppercase tracking-wide transition-all duration-300 ease-in-out hover:bg-white hover:text-red-600 hover:border-white hover:shadow-xl cursor-pointer"
                    >
                        <FontAwesomeIcon icon={faInfoCircle} />
                        Chi tiết
                    </button>
                </div>

            </div>
        </div>
    );
};

export default Banner;