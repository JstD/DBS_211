import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useHistory, Link} from 'react-router-dom';
import Navbar from '../components/TeacherTopNav';
import {Home} from './HomePageStyle';
import banner from '../images/banner.png';
import { Container, Row, Col, Table, Button } from 'reactstrap';
import server from '../config/host';

const HomePage = ()=>{
    const [allCourse, setAllCourse] = useState();
    const history = useHistory();

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
            res = await fetch(`${server}/api/teacher/course`, {
                method: 'GET',
                headers: {
                    'Authorization': authorizationField
                },
            })
            data = await res.json();
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
                Danh sách khóa học được phân công
                </h3>
            </Col>
            </Row>
            <Row>
            <Table style={{width:80+'%', margin:'auto', textAlign: 'center'}}>
    <thead>
        <tr>
        <th>
            Course Id
        </th>
        <th>
            CourseName
        </th>
        <th>
            Campage Id
        </th>
        <th>
            Room
        </th>
        <th>
            Building Name
        </th>
        
        <th>
            Start Date
        </th>
        <th>
            Action
        </th>
        </tr>
    </thead>
    <tbody>
        {allCourse&&allCourse.map((element)=>{
            return (<tr>
                <th scope="row">
                    {element.IdKh}
                </th>
                <td>
                    {element.Ten}
                </td>
                <td>
                    {element.IdCn}
                </td>
                <td>
                    {element.So_phong}
                </td>
                <td>
                    {element.Ten_toa}
                </td>
                <td>
                    {element.Ngay_bat_dau.slice(0,10).split('-').reverse().join('/')}
                </td>
                <td>
                    <Button color = "primary" onClick={()=>location.href =`/teacher/course/${element.IdKh}`}>View Students List</Button>
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