USE [Sapphire_Foods_Dev]
GO
/****** Object:  StoredProcedure [dbo].[SF_REQUEST_LIST]    Script Date: 02-04-2024 19:12:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
 -- EXEC [SF_REQUEST_LIST] @USERUID = 13
ALTER PROCEDURE [dbo].[SF_REQUEST_LIST]
    @USERUID INT
AS
 BEGIN
  SET NOCOUNT ON;

	DECLARE @RequestTable AS TABLE(reqID int)
	DECLARE @workFlowStage AS TABLE(stageID int)
	DECLARE @workFlowStatus AS TABLE(statusID int)

	INSERT INTO @RequestTable(reqID)
	SELECT DISTINCT workFlowRequestUID	FROM tbl_xWorkflowStatusRemarks	WHERE createdby = @USERUID

	INSERT INTO @workFlowStage(stageID)
	SELECT DISTINCT workFlowStageUID FROM tbl_mWorkFlowStageUser WHERE userUID = @USERUID

	INSERT INTO @workFlowStatus(statusID)
	SELECT DISTINCT approveID FROM tbl_mWorkFlowStageUser WHERE userUID = @USERUID
	UNION ALL
	SELECT DISTINCT rejectID FROM tbl_mWorkFlowStageUser WHERE userUID = @USERUID

	SELECT a.workFlowRequestUID,b.statusDescription
	INTO #Temp_CurrStatus
	FROM (
	SELECT workFlowRequestUID,MAX([status]) [status] 
	FROM [dbo].[tbl_xWorkflowStatusRemarks]
	GROUP BY workFlowRequestUID
	)a
	LEFT OUTER JOIN [tbl_xWorkflowStatusRemarks] b on a.workFlowRequestUID = b.workFlowRequestUID and a.[status] = b.[status]

	SELECT distinct WF.*,TS.statusDescription 
	FROM [dbo].[tbl_xWorkflowStatusRemarks] WFSR
	INNER JOIN [dbo].[tbl_tWorkFlow] WF ON WFSR.workFlowRequestUID = WF.workFlowRequestUID
	LEFT OUTER JOIN  [dbo].[tbl_xWorkflowFiles] WFF ON WF.workFlowRequestUID = WFF.workFlowRequestUID
	LEFT OUTER JOIN #Temp_CurrStatus TS ON WF.workFlowRequestUID = TS.workFlowRequestUID
	WHERE WFSR.workFlowStageUID IN (SELECT stageID FROM @workFlowStage)
	AND WFSR.[status] IN (SELECT statusID FROM @workFlowStatus) 
	AND WFSR.workFlowRequestUID IN (SELECT reqID FROM @RequestTable) 

	

END
 
 /*
 select * from tbl_tWorkFlow
 select * from tbl_xWorkflowStatusRemarks
 select * from  [dbo].[tbl_xWorkflowFiles]
 */
 /* 
truncate table tbl_tWorkFlow
truncate table [dbo].[tbl_xWorkflowFiles]
truncate table [dbo].[tbl_xWorkflowStatusRemarks]
  */
