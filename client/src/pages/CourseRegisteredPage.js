import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import Navbar from '../components/TopNav';
import {Home} from './HomePageStyle';
import banner from '../images/banner.png';
import { Container, Row, Col, Table, Button } from 'reactstrap';
import server from '../config/host';

const HomePage = ()=>{
    const [allCourse, setAllCourse] = useState();
    const authorizationField = "JWT " + localStorage.getItem('TOKEN');
    const handleCancel = async (id)=>{
        const res = await fetch(`${server}/api/course/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': authorizationField
            },
        })
        if(res.status ===200){
            alert('Successfully registered');
            location.reload();
        }
    }
    useEffect(() => {
        
        const fetchData = async () => {
            const res = await fetch(`${server}/api/course/registered`, {
                method: 'GET',
                headers: {
                    'Authorization': authorizationField
                },
            })

            const {data} = await res.json();
            if (res.status === 200) {
                setAllCourse(data)
            } 
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
                Danh sách khóa học đã đăng ký
                </h3>
            </Col>
            </Row>
            <Row>
            <Table style={{width:80+'%', margin:'auto', textAlign: 'center'}}>
    <thead>
        <tr>
        <th>
            #
        </th>
        <th>
            Name
        </th>
        <th>
            Start At
        </th>
        <th>
            Price
        </th>
        <th>
            Action
        </th>
        </tr>
    </thead>
    <tbody>
        {allCourse&&allCourse.map((element, idx)=>{
            return (<tr>
                <th scope="row">
                    {idx+1}
                </th>
                <td>
                    {element.Ten}
                </td>
                <td>
                    {element.Ngay_bat_dau.slice(0,10).split('-').reverse().join('/')}
                </td>
                <td>
                    {element.Gia}
                </td>
                <td>
                    <Button color = "danger" onClick = {()=>handleCancel(element.IdKh)} >Cancel</Button>
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