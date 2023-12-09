const Checkbox = ({ inf, index }) => {

  const handleChange = (event) => {
    const { checked } = event.target;
  };

  return (
      <label key={index} className="category">
        <input
          name={inf.name}
          type="checkbox"
          // checked={true}
          onChange={handleChange}
        />
        {inf.name}
      </label>
  );
};
export default Checkbox;
