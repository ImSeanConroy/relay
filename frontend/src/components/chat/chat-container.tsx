import ChatMessages from './chat-messages'
import ChatInput from './chat-input'

const ChatContainer = () => {
  return (
    <div className='flex flex-col'>
      <ChatMessages />
      <ChatInput />
    </div>
  )
}

export default ChatContainer