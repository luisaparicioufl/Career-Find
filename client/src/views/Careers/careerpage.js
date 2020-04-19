
import ListGroup from 'react-bootstrap/ListGroup'
import React, {useState, useEffect, Fragment} from 'react';
import Container from 'react-bootstrap/Container'
import Figure from 'react-bootstrap/Figure'
import business from './business.jpg'


const Careerpage = (props) => {

const [careername,setCareername] = useState("");
const [careerselected,setCareerselected] = useState(false);
const [careerdata,setCareerdata] = useState({career:[]});


let careermap;

let map = props.reducedcareers.map(career => 
    <ListGroup>
        <ListGroup.Item action onClick = {()=> handleClick([career])}>{career.OnetTitle}</ListGroup.Item>
    </ListGroup>
)



async function handleClick (data) {

    setCareerdata(data);
    setCareername(data[0].OnetTitle);
    setCareerselected(true);    
    
    
}

    

    if (props.clustername === "19-" && careerselected === false) { 
        
        return (
            <Container>
                <h1 style={{color: "green"}}>Environmental and Agricultural Sciences</h1>
                {map}
            </Container>
       );
    }

    if (props.clustername === "15-" && careerselected === false) { 
        
        return (
            <Container>
                <h1 style={{color: "grey"}}>Communications and Information Systems</h1>
                {map}
            </Container>
        
       );
    }
    if (props.clustername === "47-" && careerselected === false) { 
        
        return (
            <Container>
                <h1 style={{color: "orange"}}>Industrial, Manufacturing, and Engineering</h1>
                {map}
            </Container>
        
       );
    }
    if (props.clustername === "29-" && careerselected === false) { 
        
        return (
            <Container>
                <h1 style={{color: "red"}}>Health Sciences</h1>
                {map}
            </Container>
        
       );
    }
    if (props.clustername === "21-" && careerselected === false) { 
        
        return (
            <Container>
                <h1 style={{color: "cyan"}}>Human Services and Resources</h1>
                {map}
            </Container>
        
       );
    }
    if (props.clustername === "13-" && careerselected === false) { 
        
        return (
            <Container>
                 <h1 style={{color: "blue"}}>Business, Marketing and Management</h1>
                 {map}
            </Container>
        
       );
    }
    if (props.clustername === "-" && careerselected === false) { 
        
        return (
            <Container>
                 <h1 style={{color: "black"}}>All</h1>
                 {map}
            </Container>
        
       );
    }

    else if(careerselected) {

   //this is the actual career page template
    return (
        <Fragment>
        <div className="careerheader">
        <center><h1>{careername}</h1></center>
    </div>
   
    <div className="careerrow">
        <div className="leftcol">
            <img src={business} alt="171x180" height="180" width="171" className="careerimg"></img>
        </div>
        {careerdata.map(career =>
        <div className="rightcol">
        <h3>Description</h3>
        <p>{career.OnetDescription}</p>
        </div>
        )}
    </div>
   
    <div className="careerrow">
        <div className="leftcol">
        <h3>Salary</h3>
            <p>Annual wages in United States</p>
                <table>
                    <tr>
                        <td><b>Location</b></td>
                        <td><b>United States</b></td>
                    </tr>
                    <tr>
                        <td><b>10%</b></td>
                        <td>${careerdata[0].Wages.NationalWagesList[1].Pct10}</td>
                    </tr>
                    <tr>
                        <td><b>25%</b></td>
                        <td>${careerdata[0].Wages.NationalWagesList[1].Pct25}</td>
                    </tr>
                    <tr>
                        <td><b>Median</b></td>
                        <td>${careerdata[0].Wages.NationalWagesList[1].Median}</td>
                    </tr>
                    <tr>
                        <td><b>75%</b></td>
                        <td>${careerdata[0].Wages.NationalWagesList[1].Pct75}</td>
                    </tr>
                    <tr>
                        <td><b>90%</b></td>
                        <td>${careerdata[0].Wages.NationalWagesList[1].Pct90}</td>
                    </tr>
                </table>
        </div>
        <div className="rightcol">
            <h3>Watch a Video</h3>
        <iframe src={"http://www.careeronestop.org/videos/Careeronestop-videos-content.aspx?videocode="+careerdata[0].Video[0].VideoCode} width="500" height="300" frameborder="0" scrolling="no" allowfullscreen/>
        </div>
        </div>

        
       
        <div className="careerrow">
        <div className="leftcol">
        
        <h3>Required Abilities</h3>
            <p>People in this career often have talent in:</p>
            {careerdata[0].AbilityDataList.map(data => 
            <ol>
                <li>{data.ElementName}</li>
            </ol>)} 
        </div>
        <div className="rightcol">
            <h3>Activities you might do in a day</h3>
            {careerdata[0].Tasks.map(data => 
            <ol>
                <li>{data.TaskDescription}</li>
            </ol>)}
        </div>
        </div>

        <div className="careerrow">
        <div className="leftcol">
        <h3>Required Knowlegde</h3>
            <p>People in this career often know a lot about:</p>
            {careerdata[0].KnowledgeDataList.map(data => 
            <ol>
                <li>{data.ElementName}</li>
            </ol>)}
               
        </div>
        <div className="rightcol">
            <h3>Required Skills</h3>
            <p>People in this career often have these skills:</p>
            {careerdata[0].SkillsDataList.map(data => 
            <ol>
                <li>{data.ElementName}</li>
            </ol>)}
        </div>
        </div>

        
    </Fragment>  
            
          
        ); 
    }

    else
    return 0;
}



export default Careerpage;
