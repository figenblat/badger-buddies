import { Container, Row, Col} from "react-bootstrap";
import { useEffect, useState } from "react";
import BadgerBudsDataContext from '../../../contexts/BadgerBudsDataContext';
import  { useContext } from 'react';
import CatsInBasket from '../../CatsInBasket';

export default function BadgerBudsBasket(props) {

    const badgerBudsData = useContext(BadgerBudsDataContext);


    const [savedCatIds, setSavedCatIds] = useState([]);
    const[availableCats, setAvailableCats] = useState([]);

    const savedIds = JSON.parse(sessionStorage.getItem('savedCatIds')) || [];

    

    useEffect(() => {
        setSavedCatIds(savedIds);
      }, [savedIds]);

      useEffect(()=>{
        setAvailableCats(badgerBudsData.filter((cat) => savedCatIds.includes(cat.id)));
      }, [badgerBudsData, savedCatIds]);

      let noBuds = "";
      if(availableCats.length === 0){
        noBuds = "You have no buds in your basket!";
      }
     

    return <div>
        <h1>Badger Buds Basket</h1>
        <p>These cute cats could be all yours!</p>
        <p>{noBuds}</p>

        <Container fluid>
        <Row>
        {availableCats.map((cat) => (
                <Col xs={12} sm = {8} md={6} lg={4} xl={3} key={cat.id}>
                 <CatsInBasket cat={cat}  />
                </Col>
        ))}
      </Row>
      </Container>
    </div>
}