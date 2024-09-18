import { FaThumbsUp, FaThumbsDown, FaComment } from 'react-icons/fa';

const Icons = ({ type }) => {
  switch (type) {
    case 'thumbs-up':
      return <FaThumbsUp />;
    case 'thumbs-down':
      return <FaThumbsDown />;
    case 'comment':
      return <FaComment />;
    default:
      return null;
  }
};

export default Icons;
