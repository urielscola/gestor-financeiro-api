module.exports = {
	summary: function(array) {
		if (array.length === 0) {
			return 0;
		} else if (array.length === 1) {
			return array[0].value;
		} else {
			return array.reduce((prev, next) => {
				return prev + next.value;
			}, 0);
		}
	},

	summaryAll: function(cycles, opt) {

		if (opt === 1) {
			if (cycles.length === 0) {
				return 0;
			} else if (cycles.length === 1) {
				return cycles[0].totalCredits;
			} else {
				return cycles.reduce((prev, next) => {
					return prev + next.totalCredits;
				}, 0);
			}
		} else if (opt === 2) {
			if (cycles.length === 0) {
				return 0;
			} else if (cycles.length === 1) {
				return cycles[0].totalDebits;
			} else {
				return cycles.reduce((prev, next) => {
					return prev + next.totalDebits;
				}, 0);
			}
		}
	}
}