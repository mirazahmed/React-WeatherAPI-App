import React, { Component } from 'react';
import Title from "./components/Title";
import Form from "./components/Form";
import Weather from "./components/Weather";




export default class App extends Component {

    state = {
        temparature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: undefined
    }

    getWeather = async (e) => {
        e.preventDefault();
        const city = e.target.elements.city.value;
        const country = e.target.elements.country.value;

        const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`);
        const data = await api_call.json();
        
        

        if(city && country){
            this.setState({
                temparature: data.main.temp,
                city: data.name,
                country: data.sys.country,
                humidity: data.main.humidity,            
                description: data.weather[0].description,
                error: ""
            });
        } else {
            this.setState({
                temparature: undefined,
                city: undefined,
                country: undefined,
                humidity: undefined,            
                description: undefined,
                error: "Please enter the value"
            });
        
        }
    }
    render() {
        return (
            <div>
                <div className="wrapper">                    
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-5 title-container">
                                <Title />
                            </div>
                            <div className="col-xs-7 form-container">
                            <Form getWeather={this.getWeather} />
                                <Weather 
                                    temparature={this.state.temparature}
                                    city={this.state.city}
                                    country={this.state.country}
                                    humidity={this.state.humidity}
                                    description={this.state.description}
                                    error={this.state.error}
                                />
                            </div>
                        </div>
                    </div>                    
                </div>
            </div>
        );
    }
}



                