import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
/*import ExploreContainer from '../components/ExploreContainer';*/
import './Tab.css';
/**charts */


import {
  IonCardSubtitle, IonCard, IonCardHeader, IonCardTitle, IonItem,
  IonButton, IonCardContent, IonLabel, IonSegment, 
  IonSegmentButton, IonIcon, IonGrid, IonRow, IonCol,  
} from '@ionic/react';
import { walk } from 'ionicons/icons';
import { Bar } from 'react-chartjs-2';
import firebase from '../Firebase';






const Tab1: React.FC = () => {

  // Set required variables
  const [datenow] = useState(
    new Intl.DateTimeFormat("en-GB", {
      year: "numeric",
      month: "long",
      day: "2-digit"
    }).format(new Date())
  )

  const [User, setUser] = useState(0)
  const [Time, setTime] = useState(0)
  const [Count_Date, setCount_Date] = useState(0)
  const [Userchart, setUserchart] = useState({})
  const [Timechart, setTimechart] = useState({})
  const [Count_Datechart, setCount_Datechart] = useState({})

    // load Firebase collection
    const dbref = firebase.database().ref('count_walk/') 
    useEffect(() => {
      loadData()
    }, [])
  
    const loadData = () => {
      // Extract Firebase collection to array
      dbref.on('value', resp => {
        let data: any[] = snapshotToArray(resp)
        // Sum total
        let Usercount = 0
        let Timecount = 0
        let Count_Datecount = 0
        
        data.forEach((doc) => {
          Usercount = Usercount + doc.User
          Timecount = Timecount + doc.time
          Count_Datecount = Count_Datecount + doc.Date
        });
        setUser(Usercount)
        setTime(Timecount)
        setCount_Date(Count_Datecount)
  



        // Build charts       
        let UserAmount: any[] = []
        let TimeAmount: any[] = []
        let Count_DateAmount: any[] = []
        let caseDate: any[] = []
        let chartData: any[] = []



        data.reduce((res, value) => {
          if (!res[value.date]) {
            res[value.date] = { date: value.date, User: 0, time:0, Date:0};
            Count_DateAmount.push(res[value.date])

          }
          res[value.date].User += value.User;
          res[value.date].time += value.time;
          res[value.date].Date += value.Date;
          return res;
        }, {});
        Count_DateAmount.forEach((cd) => {
          caseDate.push(cd.date)
          UserAmount.push(cd.User)
          TimeAmount.push(cd.time)
          Count_DateAmount.push(cd.Date)
          
        })
        setCount_Datechart({
          labels: caseDate,
          datasets: [
            {
              label: 'User Chart',
              backgroundColor: 'rgba(255,99,132,0.2)',
              borderColor: 'rgba(255,99,132,1)',
              borderWidth: 1,
              hoverBackgroundColor: 'rgba(255,99,132,0.4)',
              hoverBorderColor: 'rgba(255,99,132,1)',
              data: Count_DateAmount
            }
          ]
        })
        setUserchart({
          labels: caseDate,
          datasets: [
            {
              label: 'User Chart',
              backgroundColor: 'rgba(255,99,132,0.2)',
              borderColor: 'rgba(255,99,132,1)',
              borderWidth: 1,
              hoverBackgroundColor: 'rgba(255,99,132,0.4)',
              hoverBorderColor: 'rgba(255,99,132,1)',
              data: UserAmount
            }
          ]
        })
        setTimechart({
          labels: caseDate,
          datasets: [
            {
              label: 'User Chart',
              backgroundColor: 'rgba(255,99,132,0.2)',
              borderColor: 'rgba(255,99,132,1)',
              borderWidth: 1,
              hoverBackgroundColor: 'rgba(255,99,132,0.4)',
              hoverBorderColor: 'rgba(255,99,132,1)',
              data: TimeAmount
            }
          ]
        })
      });
    }



    const snapshotToArray = (snapshot: any) => {
      const returnArr: any[] = []
    
      snapshot.forEach((childSnapshot: any) => {
          const item = childSnapshot.val()
          item.key = childSnapshot.key
          returnArr.push(item)
      });
    
      return returnArr;
    }

  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>หน้าหลัก</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>

        {/*--<IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large"> Home </IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="Tab 1 page" />--*/}
    

        <IonCard>
          <IonCardHeader>
          <IonItem>
            <IonIcon icon={walk}  size="large"/>
            <IonCardTitle>จำนวนก้าวเดินวันนี้</IonCardTitle>
          </IonItem>
           {/*--  <IonCardSubtitle> ก้าวเดิน </IonCardSubtitle> --*/}
          </IonCardHeader>
          <IonCardContent>
            <IonCardSubtitle> {datenow} </IonCardSubtitle>
            <IonLabel> 1,999 ครั้ง </IonLabel>
          </IonCardContent>
        </IonCard>
        
        

        {/*-- Default Segment --*/}
        <IonSegment onIonChange={e => console.log('Segment selected', e.detail.value)}>
        
          <IonSegmentButton value="Today">
            <IonLabel>วันนี้</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="Months">
            <IonLabel>เดือนนี้</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="Year">
            <IonLabel>ปีนี้</IonLabel>
          </IonSegmentButton>

        </IonSegment>



        {/**chart */}
        
        <IonCardContent>
            <IonGrid>
              <IonRow>
                <IonCol size="12" size-sm>
      Confirmed User: <strong>{User}{Time}{Count_Date}</strong>
                </IonCol>
                <IonCol size="12" size-sm>
                  <Bar
                    data={Count_Datechart}
                    width={100}
                    height={100}
                    options={{
                      maintainAspectRatio: true
                    }}
                  />
                </IonCol>
              </IonRow>
              
              
              <IonRow>
                <IonCol>
                  <IonButton expand="block" fill="solid" color="secondary" routerLink="/list">Show List of Countries</IonButton>
                </IonCol>      
              </IonRow>
            </IonGrid>
          </IonCardContent>

             
      </IonContent>
    </IonPage>
  );
};

export default Tab1;