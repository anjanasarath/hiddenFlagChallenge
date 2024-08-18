import fetch from 'node-fetch'; 
import dotenv from 'dotenv';
dotenv.config();

const cursor =  "";
const bearerToken = process.env.TOKEN;
const apiEndpoint = "https://flag-gilt.vercel.app/api/challenge";



function getNextResponse(cursor){
    return fetch(apiEndpoint, {
    method: "POST",
    body: JSON.stringify({ cursor }),
    headers: {Authorization: `Bearer ${bearerToken}`}
  })
     .then(resp => resp.json())
     
}

async function findingHiddenFlag()
{
    let response, nextCursor = cursor, steps = 0;

    do 
    {
        response = await getNextResponse(nextCursor);
        nextCursor = response.nextCursor;
        steps = steps+1;

    }while(nextCursor)
    console.log(response);
    console.log("The hidden flag is found on " +steps+ "th step");
    return response.flag;
    

}

async function showFlag(){
  const flag =  await findingHiddenFlag();
  console.log(flag);

}

showFlag();




