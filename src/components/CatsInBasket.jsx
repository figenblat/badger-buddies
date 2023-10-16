
import { Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

const CatsInBasket = ({ cat }) => {
    const imageSrc = `https://raw.githubusercontent.com/CS571-F23/hw5-api-static-content/main/cats/${cat.imgIds[0]}`;


    // handling a click of the unselect button 
    const handleUnselect = ()=>{

        let savedCatIds = JSON.parse(sessionStorage.getItem('savedCatIds'));
        alert(`${cat.name} has been unselected!`);
        let idIndex = savedCatIds.indexOf(cat.id);
        savedCatIds.splice(idIndex, 1);
        sessionStorage.setItem('savedCatIds', JSON.stringify(savedCatIds))
   }

   const handleAdoptedCat = () => {
    // removing the cat id from the saved cats session storage
        let savedCatIds = JSON.parse(sessionStorage.getItem('savedCatIds'));
        let idIndex = savedCatIds.indexOf(cat.id);
        savedCatIds.splice(idIndex, 1);
        sessionStorage.setItem('savedCatIds', JSON.stringify(savedCatIds))

    // adding the cat id to the adopted cats session storage
        const adoptedCatIds = JSON.parse(sessionStorage.getItem('adoptedCatIds')) || [];
        alert(`${cat.name} has been adopted!`);
        adoptedCatIds.push(cat.id);
        sessionStorage.setItem('adoptedCatIds', JSON.stringify(adoptedCatIds));

   }
    
    return (
      <Card className="m-auto" style={{margin:"10px", padding:"10px"}}> 
        <img src={imageSrc} alt={`A picture of ${cat.name}`} className="d-block mx-auto img-fluid" style={{height:"300px", width:"300px"}}/>
        <h2>{cat.name}</h2>
        <Button onClick={handleUnselect} style={{margin:"5px"}} >Unselect</Button> 
        <Button  onClick = {handleAdoptedCat} style={{margin:"5px"}} >Adopt!</Button> 
      </Card>
    );
  };
  
  export default CatsInBasket;