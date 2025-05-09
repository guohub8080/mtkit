// 支持的节奏模式定义
const rhythmPatterns = {
	"2/4": {
		beatsPerMeasure: 2, // 每小节拍数
		accentMap: [       // 强弱拍映射（0=强，1=中强，2=弱）
			"strong",        // 第1拍（强）
			"weak",          // 第2拍（弱）
		]
	},
	"4/4": {
		beatsPerMeasure: 4, // 每小节拍数
		accentMap: [       // 强弱拍映射（0=强，1=中强，2=弱）
			"strong",        // 第1拍（强）
			"weak",          // 第2拍（弱）
			"medium",        // 第3拍（中强）
			"weak"           // 第4拍（弱）
		]
	},
	"3/4": {
		beatsPerMeasure: 3,
		accentMap: [
			"strong",
			"weak",
			"weak"
		]
	},
	"6/8": {
		beatsPerMeasure: 6,
		accentMap: [
			"strong",   // 第1拍（强）
			"weak",
			"weak",
			"medium",   // 第4拍（中强）
			"weak",
			"weak"
		]
	}
}
export default rhythmPatterns;
