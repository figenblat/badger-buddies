import { Container, Row, Col} from "react-bootstrap";
import  { useContext } from 'react';
import BadgerBudsDataContext from '../../../contexts/BadgerBudsDataContext';
import BadgerBudSummary from '../../BadgerBudSummary';
import { useEffect, useState, useMemo } from "react";


export default function BadgerBudsAdoptable(props) {

    const badgerBudsData = useContext(BadgerBudsDataContext);
    

    
    const [savedCatIds, setSavedCatIds] = useState([]);
    const[availableCats, setAvailableCats] = useState([]);
   
   
    const savedIds = JSON.parse(sessionStorage.getItem('savedCatIds')) || []; // figure out how to get rid of the warning about depth 
    const adoptedIds = JSON.parse(sessionStorage.getItem('adoptedCatIds')) || [];
    
    // combining the savedIds and adoptedIds into one array to filter the data with 
    
    const savedAndAdopted = [];
    for(let i = 0; i < savedIds.length; i ++){
        savedAndAdopted.push(savedIds[i]);
    }
    for(let i = 0; i < adoptedIds.length; i++){
        savedAndAdopted.push(adoptedIds[i])
    }
    
    
    useEffect(() => {
        setSavedCatIds(savedIds);
      }, [savedIds]);


      useEffect(()=>{
        if(savedCatIds ===""){
            setAvailableCats(badgerBudsData)
            
        }
        else{
            setAvailableCats(badgerBudsData.filter((cat) => !savedAndAdopted.includes(cat.id)));
          }
      }, [badgerBudsData, savedAndAdopted, savedCatIds]);

      let noBuds = "";
      if(availableCats.length ===0){
        noBuds = "No buds are available for adoption!";
      }



    return <div>
        <h1>Available Badger Buds</h1>
        <p>The following cats are looking for a loving home! Could you help?</p>
        <p>{noBuds}</p>
        
        <Container fluid>
        <Row>
        {availableCats.map((cat) => (
                <Col xs={12} sm = {8} md={6} lg={4} xl={3} key={cat.id}>
                 <BadgerBudSummary cat={cat}  />
                </Col>
        ))}
      </Row>
      </Container>
    </div>
}