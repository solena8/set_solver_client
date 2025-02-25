export class ApiService {
    static API_URL = "https://set-game-api-fuvffzz23a-uc.a.run.app";
    
    static async findSet(cards) {
      const url = `${this.API_URL}/cards/${cards}`;
      console.log("URL de l'API:", url);
      
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Origin': window.location.origin
          }
        });
        
        console.log("Statut de la réponse:", response.status);
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error("Détails de l'erreur:", {
            status: response.status,
            statusText: response.statusText,
            body: errorText
          });
          
          throw new Error(`Erreur API: ${response.status} - ${errorText}`);
        }
        
        const data = await response.json();
        console.log("Données reçues:", data);
        return data;
      } catch (error) {
        console.error("Erreur complète:", error);
        throw error;
      }
    }
  }

