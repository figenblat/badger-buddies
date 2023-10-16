
import { Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';

const BadgerBudSummary = ({ cat }) => {
  const imageSrc = `https://raw.githubusercontent.com/CS571-F23/hw5-api-static-content/main/cats/${cat.imgIds[0]}`;
  const [showDetails, setShowDetails] = useState(false);

  


  //handles showing the details
  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  //calculating the age in just months or in months and years 
  const printAge = (months) => {
    if (months < 12) {
      return `${months} month(s) old`;
    } else {
      const years = Math.floor(months / 12);
      const remainderMonths = months % 12;
      if (remainderMonths === 0) {
        return `${years} year(s) old`;
      } else {
        return `${years} year(s) and ${remainderMonths} month(s) old`;
      }
    }
  };
  

// handling save click 
const handleSave = () => {
  const savedCatIds = JSON.parse(sessionStorage.getItem('savedCatIds')) || [];
  if (savedCatIds.includes(cat.id)) {
    alert(`${cat.name} has already been saved to your basket!`);
  } 
  else {
    savedCatIds.push(cat.id);
    sessionStorage.setItem('savedCatIds', JSON.stringify(savedCatIds));
    alert(`${cat.name} has been added to your basket!`);
  }
};


  

  return (
    <Card className="m-auto" style={{margin:"10px", padding:"10px"}}> 
      <img src={imageSrc} alt={`A picture of ${cat.name}`} className="d-block mx-auto img-fluid" style={{height:"300px", width:"300px"}}/>
      <h2>{cat.name}</h2>
      {showDetails ? (
        <div>
          <p>Gender: {cat.gender}</p>
          <p>Breed: {cat.breed}</p>
          <p>Age: {printAge(cat.age)}</p>
          {cat.description && <p> {cat.description}</p>}
          <Button onClick={toggleDetails}>Show Less</Button>
        </div>
      ) : (
        <Button onClick={toggleDetails}>Show More</Button>
      )}
      
      <Button onClick ={handleSave} style={{margin:"5px"}} >Save</Button> 
    </Card>
  );
};

export default BadgerBudSummary;