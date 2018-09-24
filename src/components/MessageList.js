import React, { Component } from 'react';

class MessageList extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            displayedMessages:  [],
            newMessages: '',
            roomId: '',
            

        }
        this.messagesRef = this.props.firebase.database().ref( 'messages' );
    }
   

        componentDidMount() {
            this.messagesRef.on('child_added', snapshot => {
                const message = snapshot.val();
                message.key = snapshot.key;
                this.setState({ displayedMessages: this.state.displayedMessages.concat( message ) });
               //console.log(snapshot.val()); 
               });
           
                
          
         }
           

           createMessage(newMessages) {
               if (!this.props.activeRoom || !newMessages ) { return }
               this.messagesRef.push({
                username: "<username>",
                content: newMessages,
                sentAt: "<timestamp>",
                roomId: this.props.activeRoom.key,
               });
               this.setState({ newMessages: ''});
            }
            handleChange(event) {
                this.setState({ newMessages: event.target.value });
            }
            
           handleSubmit(event) {
            event.preventDefault();
            this.setState({ newMessages: this.state.value });
            this.state.value = ""
          };
        
    

render () {
   
    //console.log(this.state.displayedMessages)
    return (
        <div id="room-component">
            <h3 className="chat-room"> {this.props.activeRoom ? this.props.activeRoom.name : ''}</h3>
        <ul id="message-list">
            {this.state.displayedMessages.filter( message => message.roomId === this.props.activeRoom.key).map(( message) =>
              <div key={message.key}>
                <div className="content">
                <p>{message.content}</p>
               </div>
            </div>
            )}
        </ul>
        
   
   

     <div className="message-box">
        
        <form onSubmit = { (e) => { e.preventDefault(); this.createMessage(this.state.newMessages) } }>
            <label>        
              Type Message:
              <input type="text" value= { this.state.newMessages } onChange={this.handleChange.bind(this) } />
            </label>
            <input type="submit" />
        </form>
         
     </div>
     
    </div>
    );
  }
}


    


 export default MessageList;