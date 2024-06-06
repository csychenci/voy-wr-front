import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from "static/locale/en/translation.json"; // 导入英文翻译资源文件
import translationCN from "static/locale/zh/translation.json"; // 导入法文翻译资源文件

i18n
	.use(initReactI18next) // 初始化 react-i18next
	.init({
		fallbackLng: "en", // 默认语言
		debug: true, // 打开调试模式，方便查看国际化日志
		interpolation: {
			escapeValue: false // 使用 React 组件时无需转义（例如：<strong>）
		},
		resources: {
			en: {
				translation: translationEN
			},
			zh: {
				translation: translationCN
			}
		}
	});

export default i18n;
