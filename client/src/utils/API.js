import axios from "axios";
import { push } from 'react-router-redux';
var sessionStorage = require('web-storage');

//Exports front end routes for api calls to the server
export default {

    // ** Batch API calls **

    getBatches: function() {
        return axios.get("api/batch");
    },
    createBatch: function(batchData) {
       return axios.post("api/batch", batchData);
    },
    getBatch: function(id) {
        return axios.get("api/batch/" + id);
    },
    updateBatch: function(id) {
        return axios.put("api/batch/" + id);
    },
    deleteBatch: function(id) {
        return axios.delete("api/batch/" + id);
    },

    // ** Recipe API Calls **

    getRecipes: function() {
        return axios.get("api/recipe");
    },
    createRecipe: function(recipeData) {
       return axios.post("api/recipe", recipeData);
    },
    getRecipe: function(id) {
        return axios.get("api/recipe/" + id);
    },
    updateRecipe: function(id) {
       return axios.put("api/recipe/" + id);
    },
    updateRecipeVol: function(id, vol) {
        return axios.put("api/recipe/" + id + "/" + vol);
    },
    updateRecipeVolByName: function(name, vol) {
        return axios.put("api/recipe/volbyname/" + name + "/" + vol );
    },
    deleteRecipe: function(id) {
       return axios.delete("api/recipe/" + id);
    },

    // ** Sale API Calls **

    getSales: function() {
        return axios.get("api/sale");
    },
    createSale: function(saleData) {
        return axios.post("api/sale", saleData);
    },
    getSale: function(id) {
        return axios.get("api/sale/" + id);
    },
    updateSale: function(id) {
        return axios.put("api/sale/" + id);
    },
    deleteSale: function(id) {
        return axios.delete("api/sale/" + id);
    },

    // User API Calls

    getUsers: function() {
        return axios.get("api/user");
    },
    signIn: function(userData) {
        return axios.post("/api/user/signin", userData).then(function(response) {
                console.log(response);
                sessionStorage.set("access_token", response.data.token);
                if (response.data.user.isAdmin === true) {
                    sessionStorage.set("admin_token", response.data.user.isAdmin)
                };
            })

            .catch(function(error) {
                console.log(error.request.response);
            });
    },
    newUser: function(userData) {
        return axios.post("/api/user/signup", userData).then(function(response) {
                console.log(response);
            })
            .catch(function(error) {
                console.log(error);
            });
    },
    updateUser: function(id) {
        return axios.put("api/user/" + id);
    },
    deleteUser: function(id) {
        return axios.delete("api/user" + id);
    },

    // Customer API Calls

    getCustomers: function() {
        return axios.get("api/customer");
    },
    createCustomer: function(customerData) {
        return axios.post("api/customer", customerData);
    },
    getCustomer: function(id) {
        return axios.get("api/customer" + id);
    },
    updateCustomer: function(id) {
        return axios.put("api/customer" + id);
    },
    deleteCustomer: function(id) {
        return axios.delete("api/customer" + id);
    },
};
