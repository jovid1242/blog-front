const LoadButton = ({ onClick }) => {
  return (
    <div className="text-center">
      <button className="btn btn-simple" onClick={onClick}>
        Ещё
      </button>
    </div>
  );
};

export default LoadButton;
