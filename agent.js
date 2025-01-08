// Import the module
const axios = require('axios');

class AgentQuery{
    /*
    * Construct a instance of the Agent
    */
   constructor(apiKey, agentId, baseUrl = "https://api.0x-network.com/index.php"){
    this.apiKey = apiKey;
    this.agentId = agentId;
    this.baseUrl = baseUrl;
   }

   encodeMessage(message){
    return Buffer.from(message).toString('base64');
   }

   async queryAgent(message){
    try{
        const encodeMessage = this.encodeMessage(message);

        const url = `${this.baseUrl}?action=query-agent&api_key=${this.apiKey}&agent_id=${this.agentId}&message=${encodeMessage}`;
        const response = await axios.get(url);

        return response.data;
    }catch(e){
        console.error("Error: ", e.message);
    }
   }
}

// Let's execute it now

const API_KEY = "YourAPI";
const AGENT_ID = 11;
// Instanciate the agent
const agentQuery = new AgentQuery(API_KEY, AGENT_ID);

async function executeQuery(){
    const message = 'Who are you';
    const result = await agentQuery.queryAgent(message);
    console.log("Agent Response: ", result);
}

// Execute
(async () => {
    await executeQuery();
})();
