import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useHistory, Link, useParams } from 'react-router-dom';
import Navbar from '../components/TeacherTopNav';
import {Home} from './HomePageStyle';
import banner from '../images/banner.png';
import { Container, Row, Col, Table, Button } from 'reactstrap';
import server from '../config/host';

const HomePage = ()=>{
    const [allCourse, setAllCourse] = useState();
    const history = useHistory();
    const {id} = useParams();
    
    useEffect(() => {
        const fetchData = async () => {
            const authorizationField = "JWT " + localStorage.getItem('TOKEN');
            let res = await fetch(`${server}/api/teacher/auth`, {
                method: 'GET',
                headers: {
                    'Authorization': authorizationField
                },
            })

            let data = await res.json();
            
            console.log(data);
            if (data.role!='teacher')
                return history.push('/teacher/login');
            res = await fetch(`${server}/api/teacher/course/${id}`, {
                method: 'GET',
                headers: {
                    'Authorization': authorizationField
                },
            })
            data = await res.json();
            console.log(data.data);
            setAllCourse(data.data);
        }
        try{
            fetchData()
        }catch(e){
            console.log("can't fetch data");
        }
    }, [])
    return (
        <Home> 
            <Navbar/>
            <Banner src={banner}/>
            <Container style={{paddingTop: 50 +'px', backgroundColor: 'white',minHeight: 100+'vh',paddingBottom:50+'px'}}>
            <Row>
            <Col xs="1"></Col>
            <Col xs="9">
                <h3 >
                Danh sách học viên tham dự
                </h3>
            </Col>
            </Row>
            <Row>
            <Table style={{width:80+'%', margin:'auto', textAlign: 'center'}}>
    <thead>
        <tr>
        <th>
            Id
        </th>
        <th>
            Register time
        </th>
        <th>
            Name
        </th>
        </tr>
    </thead>
    <tbody>
        {allCourse&&allCourse.map((element)=>{
            return (<tr>
                <th scope="row">
                    {element.Id}
                </th>
                <td>
                    {element.Thoi_diem.slice(0,10).split('-').reverse().join('/')}
                </td>
                <td>
                    {element.Ten}
                </td>
            
                </tr>)
        })
        }
       
        </tbody>
    </Table>


            </Row>
            </Container>
        </Home>
        
    )
}
export default HomePage;
const Banner = styled.img`
    width = 100%;
    height = 50px;
`;