import {useState} from 'react';


const useRecentShow = () => {
const [recentShows, setRecentShows] = useState(()=> 
    JSON.parse(localStorage.getItem('recentShows')) ?? []);

const addShow = (show) => {
    setRecentShows((prev)=>{
        const next = [show, ...prev.filter((s)=>s.id !== show.id)].slice(0,10);
        localStorage.setItem('recentShows', JSON.stringify(next));
        return next;
    })
}

const removeShow = (id) => {
    setRecentShows((prev)=>{
        const next = prev.filter((s)=>s.id !== id);
        localStorage.setItem('recentShows', JSON.stringify(next));
        return next;
    })

}

return {recentShows, addShow, removeShow};
}

export default useRecentShow;