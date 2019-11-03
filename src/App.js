import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import * as axios from 'axios'

axios.defaults.baseURL = 'http://localhost:5000'

export default class App extends React.Component {
  constructor() {
    super()

    this.state = {
      messages: [],
      currentName: "",
      currentMessage: "",
    }
    this.addNameInfo = this.addNameInfo.bind(this)
    this.addMessageInfo = this.addMessageInfo.bind(this)
    this.addMessage = this.addMessage.bind(this)
    this.getMessages = this.getMessages.bind(this)

  }
  async getMessages() {
    try {
      const messages = (await axios.get(`/message`)).data
      console.log(messages)
      if (messages.length !== this.state.messages.length)
        this.setState({ messages: messages })

    } catch (err) {
      console.log(`GET - ${err}`)
    }

  }

  async addMessage() {
    try {
      await axios.post('/message', { name: this.state.currentName, message: this.state.currentMessage })
      this.getMessages()
    } catch (err) {
      console.log(`sending message error: ${err}`)
    }

  }

  addNameInfo(event) {
    this.setState({
      currentName: event.target.value
    })
  }

  addMessageInfo(event) {
    this.setState({
      currentMessage: event.target.value
    })
  }

  render() {
    return (
      <div className="container">
        <br></br>
        <div className="jumbotron">
          <h1 className="display-4">Send Message</h1>
          <br></br>
          <input className="form-control" placeholder="Name" onChange={this.addNameInfo}></input>
          <br></br>
          <textarea className="form-control" placeholder="Message" onChange={this.addMessageInfo}></textarea>
          <br></br>
          <button className="btn btn-success" onClick={this.addMessage}>Send</button>
        </div>
        {this.state.messages.map(message => {
          return (
            <div>
              <h4> {message.name}</h4>
              <p> {message.message}</p>
            </div>
          )
        })}
      </div>
    );
  }
}

