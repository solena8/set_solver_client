export class ApiService {
    static async findSet(cards) {
        try {
            const response = await fetch(`http://127.0.0.1:8000/cards/${cards}`);
            if (!response.ok) throw new Error("Erreur réseau");
            return await response.json();
        } catch (error) {
            console.error("Erreur:", error);
            throw error;
        }
    }
}
