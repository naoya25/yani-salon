import React from "react";
import YaniImage from "../components/YaniImage";

const Home: React.FC = () => {
  return (
    <div>
      <h3>Usage</h3>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <YaniImage height={600} width={400} />
        <div style={{ textAlign: "left" }}>
          <h3>Home</h3>
          <p>Homeはこのサイトの使い方や機能を説明するページです。</p>
          <h3>My page</h3>
          <p>
            自分の投稿したタバコの本数を表示するページです。下にそのグラフも表示されます。
          </p>
          <h3>Post</h3>
          <p>
            タバコを吸った本数を投稿するページです。後々画像投稿もできるようにする予定です。
          </p>
          <h3>Ranking</h3>
          <p>ユーザーのヤニカスレベルの順位を表示します。</p>
          <h3>Loged in: </h3>
          <p>
            今このサービスを利用しているアカウントのメールアドレスを表示します。
          </p>
          <h3>Logout</h3>
          <p>ログアウトするためのボタンです。</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
