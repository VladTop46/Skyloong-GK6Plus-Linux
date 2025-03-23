const  LOG_PROC_LOOP_SLEEP  =  5 ;
const  CMHK_HOTKEY_CAPTURE =  0x80000000;
const  CMHK_HOTKEY_DISABLE = 0x40000000;
const  CMHK_KEY_DISABLE   = 0x20000000;
const  CMHK_HOTKEY_PRESS  = 0x00800000;
const  g_modelInfo = new Map();
const exsitModelID = {};
let  DisplayLE = null;
let CallbackLE = null;
const AddLight = 0 ;
const StayLight = 1 ;
const DecreaseLight = 2 ;
const StayLightEx = 3 ;
const TRUE = true ;
const FALSE = false ;
const {
    rgb2hsv,
    hsv2rgb,
    rgb2hsl,
    hsl2rgb} = require('./cmcolorcovert');

function Sleep(timout) {
    return new Promise((resolve)=>{setTimeout(resolve,timout)});
}
class CMLEPlayer{
static InitPlayer( pszModelInfo,  displayfunc)
{
    DisplayLE = displayfunc;
	g_modelInfo.clear();
    const jsondata = JSON.parse(pszModelInfo);
	if(Array.isArray(jsondata))
	{
		for (let  i=0;i<jsondata.length;i++)
		{
			if(typeof jsondata[i]["LEType"] == 'string')
				g_modelInfo[jsondata[i]["ModelID"]] = jsondata[i]["LEType"];
		}
	}
}
constructor( nModelID)
{
	this.m_nModelID = nModelID;
	this.CallbackLE = null;
    this.dbTime = 0;
	this.m_jsonLEData = {};
	if(this.nModelID)exsitModelID[nModelID] = 1;
	this.CallbackLE = null;
	this.m_bPlay = false;
	this.m_bExit = false;
	this.dwSleepTimes = 0;
	this.runPid = setInterval(()=>{
		this.Run();
	},LOG_PROC_LOOP_SLEEP);
	
}



 SetPlayCallback( callbackFunc)
{
	this.CallbackLE = callbackFunc;
}

 PlayLE( pszLEData,  bModeLE)
{
	const jsonLEData = JSON.parse(pszLEData);
	if(jsonLEData)
	{
		Array.isArray(jsonLEData["Canvases"])?jsonLEData["IsGroupLE"] = true:jsonLEData["IsGroupLE"] = false;
		jsonLEData["CurFrameIndex"] = 0;
		jsonLEData["PlayCircle"] = bModeLE;
		
	
		this.m_jsonLEData = jsonLEData;
       // console.log('this.m_jsonLEData["IsGroupLE"]',this.m_jsonLEData["IsGroupLE"]);
		if(this.m_jsonLEData["IsGroupLE"])
			this.InitGroupLE(this.m_jsonLEData);
		else
			this.InitSimpleLE(this.m_jsonLEData);

		this.m_bPlay = true;
	}
	return true;
}

CloseLE()
{
	this.m_bPlay = false;
	//DisplayLE(this.m_nModelID, JSON.stringify({default:'0x000000'}));
	//DisplayLE(null);
	//this.exsitModelID = {};
	
}

StopLE()
{
	this.m_bPlay = FALSE;
	clearInterval(this.runPid);
	
}

ResumeLE()
{
	if(!exsitModelID[this.m_nModelID]) exsitModelID[this.m_nModelID] = true;

	this.m_jsonLEData.CurFrameIndex = 0;
	this.m_bPlay = true;
	clearInterval(this.runPid);
	this.runPid = setInterval(()=>{
		this.Run();
	},LOG_PROC_LOOP_SLEEP);
}

getNextFrame(jsonResData)
{
	if(this.m_jsonLEData["IsGroupLE"]){
		
		return this.GetNextFrameGroup(this.m_jsonLEData, jsonResData);
	}
	else{
		
		return this.GetNextFrameSimple(this.m_jsonLEData, jsonResData);
	}
}

Stop(){
	console.log('!!!! stop player !!!!!');
	this.m_bExit = true;
	this.runing=false;
	if(this.runPid){
		clearInterval(this.runPid);
	}
	this.CloseLE();
	if(this.m_nModelID) delete exsitModelID[this.m_nModelID];
}

GetTickCount(){
	return new Date().getTime();
}

IsStopping(){
	return this.m_bExit;
}
async Run()
{
		if(this.runing) return;
		this.runing = true;
		if(this.m_bPlay && (this.GetTickCount() - this.dbTime) > 50)
		{
			this.dbTime = this.GetTickCount();
             const bIsGroupLE = this.m_jsonLEData["IsGroupLE"];
			 const jsonData =  {};
			 
			const  bPlaying = this.getNextFrame(jsonData);
			if(bPlaying)
			{
				if(bIsGroupLE)
				{
					for (let i = 0; i < jsonData["LEList"].length;i++)
					{
						
						if(!this.m_bPlay)
							return;
						//const t = this.GetTickCount();
							
						await DisplayLE(this.m_nModelID,jsonData["LEList"][i]["ModelID"]*1, jsonData["LEList"][i]["Frame"]);
						//console.log('write spend time',this.GetTickCount()-t);
					}
				}
				else
				{
				 //  console.log('jsonData["Data"]',jsonData["Data"]);
				 if(!this.m_bPlay)
							return;
					if(jsonData["Data"]){
					if(!jsonData["Data"]["Data"])
					{
						jsonData["Data"]["default"] = "0x000000";
					}
				}
					//const t = this.GetTickCount();
					await DisplayLE(this.m_nModelID, jsonData["Data"]);
					//console.log('write spend time',this.GetTickCount()-t);
				}
			}
			else
			{
				this.m_bPlay = false;
				this.Stop();
			}
			//console.log('spend time',new Date().getTime() - this.dbTime);
		}
		this.runing=false;

	
}

ProcessHotKeyPress( dwHotKey)
{
	let  dwHotKeyValue = dwHotKey & 0x0000FFFF;
    let  bPress = false;
    const {m_jsonLEData}=this;
	if((dwHotKey & CMHK_HOTKEY_PRESS) == CMHK_HOTKEY_PRESS)
		bPress = true;
	for(let i = 0; i< m_jsonLEData["Canvases"].length; i++)
	{
		if(typeof m_jsonLEData["Canvases"][i]["HotKey"] == 'object' && typeof m_jsonLEData["Canvases"][i]["HotKey"]["Value"] == 'string' && m_jsonLEData["Canvases"][i]["HotKey"]["Value"])
		{
			const  dwHotKeyConfig = parseInt(m_jsonLEData["Canvases"][i]["HotKey"]["Value"] ,16);
			if(dwHotKeyConfig == dwHotKeyValue)
			{
				if(bPress)
				{
					if(m_jsonLEData["Canvases"][i]["HotKey"]["TriggerType"].isUInt() && (m_jsonLEData["Canvases"][i]["HotKey"]["TriggerType"]*1 == 0))
					{
						if(typeof m_jsonLEData["Canvases"][i]["CanPlay"]!='boolean' || !m_jsonLEData["Canvases"][i]["CanPlay"])
						{
							m_jsonLEData["Canvases"][i]["Start"] = m_jsonLEData["CurFrameIndex"]*1 + 1;
							this.UpdateFrameSize(m_jsonLEData);
						}
					}
					m_jsonLEData["Canvases"][i]["CanPlay"] = true;
				}else
				{
					if(Number.isInteger(m_jsonLEData["Canvases"][i]["HotKey"]["TriggerType"]) && (m_jsonLEData["Canvases"][i]["HotKey"]["TriggerType"]*1 == 1))
					{
						if(m_jsonLEData["Canvases"][i]["CanPlay"] && m_jsonLEData["Canvases"][i]["CanPlay"])
							m_jsonLEData["Canvases"][i]["CanPlay"] = false;
					}
				}
			}
		}
	}
}

GameEventCompare(jsonEvent,jsonEventData)
{
	if(	(jsonEventData["GameGUID"]==jsonEvent["GameGUID"]) &&
		(jsonEventData["Name"]==jsonEvent["EventName"])){
		if(jsonEventData["Type"]*1 == 1)
			return 0;

		switch(jsonEvent["EventType"]*1)
		{
		case 1:
			if(jsonEventData["Value"]*1 == jsonEvent["EventValue"]*1)
				return 0;
			break;
		case 2:
			if(jsonEventData["Value"]*1 != jsonEvent["EventValue"]*1)
				return 0;
			break;
		case 3:
			if(jsonEventData["Value"]*1 >= jsonEvent["EventValue"]*1)
				return 0;
			break;
		case 4:
			if(jsonEventData["Value"]*1 <= jsonEvent["EventValue"]*1)
				return 0;
			break;
		case 5:
			if(	(jsonEventData["Value"]*1 >= jsonEvent["EventMinValue"]*1) &&
				(jsonEventData["Value"]*1 <= jsonEvent["EventMaxValue"]*1))
				return 0;
			break;
		}
		return 1;
	}
	return -1;
}

ProcessGameEvent(jsonEventData)
{
    const {m_jsonLEData}=this;
    for(let i = 0; i < m_jsonLEData["Canvases"].length; i++)
	{
		if(typeof m_jsonLEData["Canvases"][i]["GameEvent"]=='object' && typeof m_jsonLEData["Canvases"][i]["GameEvent"]["GameGUID"] == 'string')
		{
			const  nEventRet = this.GameEventCompare(m_jsonLEData["Canvases"][i]["GameEvent"], jsonEventData);
			switch(nEventRet)
			{
			case 0:
				if(m_jsonLEData["Canvases"][i]["GameEvent"]["TriggerType"]===0)
				{
					if(!m_jsonLEData["Canvases"][i]["CanPlay"].isBool() || !m_jsonLEData["Canvases"][i]["CanPlay"].asBool())
					{
						m_jsonLEData["Canvases"][i]["Start"] = m_jsonLEData["CurFrameIndex"].asUInt() + 1;
						UpdateFrameSize(m_jsonLEData);
					}
				}
				m_jsonLEData["Canvases"][i]["CanPlay"] = true;
				break;
			case 1:
				if(m_jsonLEData["Canvases"][i]["GameEvent"]["TriggerType"].isUInt() && (m_jsonLEData["Canvases"][i]["GameEvent"]["TriggerType"].asUInt() == 1))
				{
					if(m_jsonLEData["Canvases"][i]["CanPlay"].isBool() && m_jsonLEData["Canvases"][i]["CanPlay"].asBool())
						m_jsonLEData["Canvases"][i]["CanPlay"] = false;
				}
			}
		}
	}
}

UpdateFrameSize(jsonData)
{
	let  nMaxIndex = 0;

	for(let  i = 0; i < jsonData["Canvases"].length; i++)
	{
		let  endIndex = jsonData["Canvases"][i]["Start"]*1 + jsonData["Canvases"][i]["Length"]*1;
		if(endIndex > nMaxIndex)
			nMaxIndex = endIndex;
	}
	jsonData["FrameSize"] = nMaxIndex;
}

InitSimpleLE(jsonData)
{
	
	const oldFrames = JSON.parse(JSON.stringify(jsonData["Frames"]));
	jsonData["Frames"]=[];
	for (let i = 0; i < oldFrames.length; i++)
	{
		let  nCountFrames = 1;
		if(Number.isInteger(oldFrames[i]["Count"]))
			nCountFrames = oldFrames[i]["Count"]*1;
		for(let j = 0; j < nCountFrames; j++)
			jsonData["Frames"].push(oldFrames[i]);
	}
	if(jsonData["LEConfigs"]){
	for(let  i = 0; i < jsonData["LEConfigs"].length; i++)
	{
		if(jsonData["LEConfigs"][i]["Type"]*1 == 2)
		{
			jsonData["LEConfigs"][i]["KeyColorFlag"] = jsonData["LEConfigs"][i]["Color"];
			const   nColorValue = parseInt(jsonData["LEConfigs"][i]["Color"],  16);
			let   tempRGB = {};
			tempRGB.r = (nColorValue >> 16) & 0xFF;
			tempRGB.g = (nColorValue >> 8) & 0xFF;
			tempRGB.b = (nColorValue >> 0) & 0xFF;
			const  tempHSL = rgb2hsl(tempRGB);
			jsonData["LEConfigs"][i]["ColorLFlag"] = tempHSL.l;
			jsonData["LEConfigs"][i]["ColorChange"] = tempHSL.l / (jsonData["LEConfigs"][i]["Count"]*1);
			tempHSL.l = 0;
			tempRGB = hsl2rgb(tempHSL);
            const   strColor = '0x'+['r','g','b'].map(k=>tempRGB[k].toString(16).padStart(2,'0')).join('');        
			jsonData["LEConfigs"][i]["Color"] = strColor;
			jsonData["LEConfigs"][i]["ColorH"] = tempHSL.h;
			jsonData["LEConfigs"][i]["ColorS"] = tempHSL.s;
			jsonData["LEConfigs"][i]["ColorL"] = tempHSL.l;
			jsonData["LEConfigs"][i]["LightChange"] = AddLight;
			jsonData["LEConfigs"][i]["StayCountFlag"] = jsonData["LEConfigs"][i]["StayCount"];
		}
		else{
			jsonData["LEConfigs"][i]["Count"] = 360 / (jsonData["LEConfigs"][i]["Count"]*1);
		}
	}
}
}

InitGroupLE(jsonData)
{
	this.UpdateFrameSize(jsonData);
	for(let  i = 0; i < jsonData["Canvases"].length; i++)
	{
		let  nTriggerType = 0;

		if ( typeof jsonData["Canvases"][i]["HotKey"] == 'object' &&
			typeof jsonData["Canvases"][i]["HotKey"]["Value"] == 'string' &&
			jsonData["Canvases"][i]["HotKey"]["Value"] &&
			typeof jsonData["Canvases"][i]["HotKey"]["TriggerType"]=='number')
			nTriggerType = jsonData["Canvases"][i]["HotKey"]["TriggerType"] * 1;

		if (typeof jsonData["Canvases"][i]["GameEvent"] == 'object' &&
			typeof jsonData["Canvases"][i]["GameEvent"]["GameGUID"] =='string' &&
			jsonData["Canvases"][i]["GameEvent"]["GameGUID"] &&
			typeof jsonData["Canvases"][i]["GameEvent"]["TriggerType"] == 'number')
			nTriggerType = jsonData["Canvases"][i]["GameEvent"]["TriggerType"]*1;

		if(nTriggerType == 0)
			jsonData["Canvases"][i]["StartOld"] = jsonData["Canvases"][i]["Start"];
		this.InitSimpleLE(jsonData["Canvases"][i]);
	}
}


getLEframe(jsonData,  frameIndex)
{
    let jsonResData = null;
    if(!Array.isArray(jsonData["LEConfigs"])){
		jsonResData = JSON.parse(JSON.stringify( jsonData["Frames"][frameIndex]));
	}
	else//parse lightinfo
	{
		const  jsonTemp = JSON.parse(JSON.stringify( jsonData["Frames"][frameIndex]));
		if(typeof jsonTemp["Data"] == 'object')
		{
			const  mem = Object.keys(jsonTemp["Data"]);
			
			for (let k =0;k<mem.length;k++)  
			{
				const  nKey = parseInt(mem[k], 10);
				let  bFind = false;
				for(let i = 0; i < jsonData["LEConfigs"].length; i++)
				{
					if(Array.isArray(jsonData["LEConfigs"][i]["Keys"]))
					{
						for(let j = 0; j < jsonData["LEConfigs"][i]["Keys"].length; j++)
						{
							if(jsonData["LEConfigs"][i]["Keys"][j]*1 == nKey)
							{
								jsonTemp["Data"][mem[k]] = jsonData["LEConfigs"][i]["Color"];
								bFind = true;
								break;
							}
						}
						if(bFind)
							break;
					}
				}
			}
			jsonResData = jsonTemp;
			for(let i = 0; i < jsonData["LEConfigs"].length; i++)
			{
				if(jsonData["LEConfigs"][i]["Type"]*1 == 0)
					continue;
				else if(jsonData["LEConfigs"][i]["Type"]*1 == 1)
				{
					const  nColorValue = parseInt(jsonData["LEConfigs"][i]["Color"], 16);

					let   tempRGB = {};
					tempRGB.r = (nColorValue >> 16) & 0xFF;
					tempRGB.g = (nColorValue >> 8) & 0xFF;
					tempRGB.b = (nColorValue >> 0) & 0xFF;
					const  tempHSV = rgb2hsv(tempRGB);
					tempHSV.h = (Math.round(tempHSV.h+0.5) + jsonData["LEConfigs"][i]["Count"]*1)%360;
					tempRGB = hsv2rgb(tempHSV);
					//CHAR strColor[9];
					//sprintf_s(strColor, "0x%02x%02x%02x", (UINT)tempRGB.r,(UINT)tempRGB.g,(UINT)tempRGB.b);//RGB
					const strColor = `0x${['r','g','b'].map(s=>`${Math.round(tempRGB[s]).toString(16)}`.padStart(2,'0')).join('')}`
					jsonData["LEConfigs"][i]["Color"] = strColor;
				
				}
				else if(jsonData["LEConfigs"][i]["Type"]*1 == 2)
				{
					const curHSL = {};
					curHSL.h = jsonData["LEConfigs"][i]["ColorH"]*1
					curHSL.s = jsonData["LEConfigs"][i]["ColorS"]*1
					curHSL.l = jsonData["LEConfigs"][i]["ColorL"]*1
					const  LightStatus = jsonData["LEConfigs"][i]["LightChange"]*1
					switch(LightStatus)
					{
					case AddLight:
						{
							curHSL.l += jsonData["LEConfigs"][i]["ColorChange"]*1;
							if(curHSL.l >= jsonData["LEConfigs"][i]["ColorLFlag"]*1)
							{
								curHSL.l = jsonData["LEConfigs"][i]["ColorLFlag"]*1;
								jsonData["LEConfigs"][i]["LightChange"] = StayLight;
							}
						}
						break;
					case StayLight:
						{
							curHSL.l = jsonData["LEConfigs"][i]["ColorLFlag"]*1;
							jsonData["LEConfigs"][i]["StayCount"] = jsonData["LEConfigs"][i]["StayCount"]*1 - 1;
							if(jsonData["LEConfigs"][i]["StayCount"]*1 == 0)
							{
								jsonData["LEConfigs"][i]["LightChange"] = DecreaseLight;
								jsonData["LEConfigs"][i]["StayCount"] = jsonData["LEConfigs"][i]["StayCountFlag"];
							}
						}
						break;
					case DecreaseLight:
						{
							curHSL.l -= jsonData["LEConfigs"][i]["ColorChange"]*1;
							if(curHSL.l<=0)
							{
								curHSL.l = 0;
								jsonData["LEConfigs"][i]["LightChange"] = StayLightEx;
							}
						}
						break;
					case StayLightEx:
						{
							curHSL.l = 0;
							jsonData["LEConfigs"][i]["StayCount"] = jsonData["LEConfigs"][i]["StayCount"]*1 - 1;
							if(jsonData["LEConfigs"][i]["StayCount"]*1 == 0)
							{
								jsonData["LEConfigs"][i]["LightChange"] = AddLight;
								jsonData["LEConfigs"][i]["StayCount"] = jsonData["LEConfigs"][i]["StayCountFlag"];
							}
						}
						break;
					}
					jsonData["LEConfigs"][i]["ColorL"] = curHSL.l;
					const  tempRGB = hsl2rgb(curHSL);
                   const  strColor = ['r','g','b'].map(k=>tempRGB[k].toString(16).padStart(2,'0')).join('');
					jsonData["LEConfigs"][i]["Color"] = strColor;
				}
			}
		}
    }
    return jsonResData;
}
GetNextFrameGroup(jsonData, jsonResData)
{
	const  frameIndex = jsonData["CurFrameIndex"] * 1;
	if(frameIndex>=jsonData["FrameSize"]*1)
	{
		if(jsonData["PlayCircle"])
			frameIndex = 0;
		else
		{
			if(this.CallbackLE)
			    this.CallbackLE(this.m_nModelID);
			return false;
		}
	}
	
	const resData = {};
	const leData = {};

	for(let i = 0; i < jsonData["Canvases"].length; i++)
	{
		let  nStart = jsonData["Canvases"][i]["Start"] * 1;
		let  nEnd = jsonData["Canvases"][i]["Length"]*1 + nStart;
		let  nTriggerType = 0;

		if (typeof jsonData["Canvases"][i]["HotKey"] == 'object' &&
			typeof jsonData["Canvases"][i]["HotKey"]["Value"] == 'string' &&
			jsonData["Canvases"][i]["HotKey"]["Value"] &&
			typeof jsonData["Canvases"][i]["HotKey"]["TriggerType"] == 'number')
			nTriggerType = jsonData["Canvases"][i]["HotKey"]["TriggerType"] * 1;

		if (typeof jsonData["Canvases"][i]["GameEvent"] == 'object' &&
			typeof jsonData["Canvases"][i]["GameEvent"]["GameGUID"] == 'string' &&
			jsonData["Canvases"][i]["GameEvent"]["GameGUID"] &&
			typeof jsonData["Canvases"][i]["GameEvent"]["TriggerType"] == 'number')
			nTriggerType = jsonData["Canvases"][i]["GameEvent"]["TriggerType"] * 1;

		if ((typeof jsonData["Canvases"][i]["HotKey"] == 'object' &&
			typeof jsonData["Canvases"][i]["HotKey"]["Value"] == 'string' &&
			jsonData["Canvases"][i]["HotKey"]["Value"]) ||
			(typeof jsonData["Canvases"][i]["GameEvent"] == 'object' && 
			typeof jsonData["Canvases"][i]["GameEvent"]["GameGUID"] == 'string' &&
			jsonData["Canvases"][i]["GameEvent"]["GameGUID"]))
		{
			if(typeof jsonData["Canvases"][i]["CanPlay"]=='boolean')
			{
				if(jsonData["Canvases"][i]["CanPlay"])
				{
					if(nTriggerType == 0)
					{
						if(frameIndex == nEnd-1)
						{
							jsonData["Canvases"][i]["CanPlay"] = false;
							jsonData["Canvases"][i]["Start"] = jsonData["Canvases"][i]["StartOld"].asUInt();
							this.UpdateFrameSize(jsonData);
						}
					}
				}
				else{
                    continue;
                }
			}else{
				continue;
			}
		}
		
		if((nTriggerType == 1) || ((frameIndex >= nStart) && (frameIndex<nEnd)))
		{
			const  curFrameSize = jsonData["Canvases"][i]["Frames"].length;
			const  curFrameIndex = (frameIndex-nStart)%curFrameSize;
			resData = this.getLEframe(jsonData["Canvases"][i],curFrameIndex);

			//get current frames
			if(Array.isArray(jsonData["Canvases"][i]["DeviceTypes"]))
			{
				for(let  j = 0; j < jsonData["Canvases"][i]["DeviceTypes"].length; j++)
				{
					const  strLETypeID = jsonData["Canvases"][i]["DeviceTypes"][j];
					//std::map<UINT,std::string>::iterator it;
                    //for(it = g_modelInfo.begin(); it != g_modelInfo.end(); it++)
                    for(let [key,value] of g_modelInfo)
					{
						if(value == strLETypeID)
						{
							if(!exsitModelID.has(key))
								exsitModelID.set(key,1);
							let  bFind = false;
							for (let k = 0; k < leData.length; k++)
							{
								if(leData[k]["ModelID"]*1 == key)
								{
                                    bFind = true;
                                    /*
									Json::Value::Members mem = resData["Data"].getMemberNames();
									Json::Value::Members::iterator itor;
									for (itor = mem.begin(); itor != mem.end(); itor++)  
									{
										leData[k]["Frame"]["Data"][*itor] = resData["Data"][*itor];
                                    }*/
                                    const mem = Object.keys(resData["Data"]);
                                    for( let key of mem){
                                        leData[k]["Frame"]["Data"][key] = resData["Data"][key];
                                    }
								}
							}
							if(!bFind)
							{
								let  nSize = leData.length;
								leData[nSize]["ModelID"] = key;
								leData[nSize]["Frame"] = resData;
							}
						}
					}
				}
			}
			else
			{
				let  bFind = false;
				for (let  j = 0; j < leData.length; j++)
				{
					if(leData[j]["ModelID"]*1 == m_nModelID)
					{
                        bFind = true;
                        const mem = Object.keys(resData["Data"]);
                        for(let key of mem){
                            leData[j]["Frame"]["Data"][key] = resData["Data"][key];
                        }
					}
				}
				if(!bFind)
				{
					let nSize = leData.length;
					leData[nSize]["ModelID"] = m_nModelID;
					leData[nSize]["Frame"] = resData;
				}
			}
		}
	}
    for(let [key,value] of exsitModelID)
	{
		let  bFind = false;
		for (let  j = 0; j < leData.length; j++)
		{
			if(leData[j]["ModelID"]*1 == key)
			{
				bFind = true;
				break;
			}
		}
		if(!bFind)
		{
			let  nTempIndex = leData.length;
			leData[nTempIndex]["ModelID"]= key;
			leData[nTempIndex]["Frame"]["Data"]["default"] = "0x000000";

		}
	}
	
	jsonResData["ISGroupLE"] = true;
	jsonResData["LEList"] = leData;
	jsonData["CurFrameIndex"] = frameIndex + 1;
	return true;
}

GetNextFrameSimple(jsonData, jsonResData)
{
	let  frameIndex = jsonData["CurFrameIndex"] * 1;
    
	if(frameIndex == jsonData["Frames"].length)
	{
		
		if(jsonData["PlayCircle"]){
			frameIndex = 0;
		}else{
			if(this.CallbackLE){
				this.CallbackLE(this.m_nModelID);
			}
			return false;
		}
	}
	const  jsonRes =  this.getLEframe(jsonData, frameIndex);
	jsonResData["ISGroupLE"] = false;
	jsonResData["Data"] = jsonRes;
	jsonData["CurFrameIndex"] = frameIndex + 1;
	return true;
}

IsSyncCtrl( nModelID)
{
	let  bSyncCtrl = false;
	if((nModelID != this.m_nModelID) && exsitModelID[nModelID])
		bSyncCtrl = TRUE;
	return bSyncCtrl;
}



}

module.exports = CMLEPlayer;