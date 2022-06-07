import React from "react";
import '../index.css'
import '../container/Services/Services.scss'
import {Card} from "react-bootstrap";
function Team({team})   {
    return(
        <div className='my_team_items'>
            <Card border="light" className='team_images text-center my-3 p-3 rounded'>
               <div className='team_myImage'>
                  <Card.Img className="team_mga" src={team.image}/>
               </div>
            <Card.Body>
                <Card.Title className="text-center bold-text " as='h4'>
                    <strong>{team.name}</strong>
                </Card.Title>
                <Card.Text>
                     {team.task}
                </Card.Text>

            </Card.Body>

        </Card>

        </div>

    )

}
export default Team;