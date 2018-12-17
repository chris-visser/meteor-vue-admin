import moment from 'moment';
import Vue from 'vue';

Vue.filter('date', value => moment(value).format('DD/MM/YYYY'));
