import "@/styles/Statistics.css";

const Statistics = () => {
  return (
    <section>
      <div className="statistics">
        <div className="statistic">
          <p id="usersRegistr" className="statistic__count">
            481
          </p>
          <span className="statistic__description">
            Пользователей зарегистрировано
          </span>
        </div>
        <div className="statistic">
          <p id="writMessages" className="statistic__count">
            140K
          </p>
          <span className="statistic__description">Сообщений написано</span>
        </div>
        <div className="statistic">
          <p id="writToday" className="statistic__count">
            389
          </p>
          <span className="statistic__description">Написано сегодня</span>
        </div>
      </div>
    </section>
  );
};
export default Statistics;
