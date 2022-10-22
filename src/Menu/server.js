export default class Server {

    async send(params = {}) {
        const query = Object.keys(params)
            .map(key => `${key}=${params[key]}`).join('&');
        const result = await fetch(`http://gs/?${query}`);
        const answer = await result.json();
        return (answer.result === 'ok') ? answer.data : null;
    }

    async login(login, password) {
        if (login && password) {
            const data = await this.send({ method: 'login', login, password });
            this.token = data.token;
            delete data.token;
            return data;
        }
        return null;
    }

    async logout() {
        if (this.token) {
            return await this.send({method: "logout", token: this.token});
        }
    }

    async getMessages() {
        return await this.send({method: "getMessages"})
    }

    async sendMessage(name, message) {
        return await this.send({method: "sendMessage", name, message})
    }
}