import '@/styles/LastMessages.css';
import LastMessageList from '@/components/LastMessageList.jsx';
const LastMessages = () => {

    return (
        <div className='lastMessages'>
            <h2 className="lastMessages__title">Последние сообщения</h2>
            <LastMessageList/>
        </div>
    )
}
export default LastMessages