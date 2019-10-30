import * as React from 'react';
import {Component} from "react-simplified";


export class foot extends Component{
    render(){
        return(
            <div>
                <div className="footer">
                    <h4>Kontakt oss: </h4>
                    <ul>
                        <li>Redaktører: Randi Eggum, Helene Jonson, Lisa Willa.</li>
                        <li>E-mail:
                            <a href="mailto:heleneyj@stud.ntnu.no?Subject=Hello%20again" target="_top">heleneyj@stud.ntnu.no</a> </li>
                    </ul>
                    <p>© 2019 Geek News</p>
                </div>
            </div>

        );
    }
}