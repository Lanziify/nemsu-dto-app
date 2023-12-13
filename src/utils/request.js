import {timeUtils} from './time';

export const requestUtil = {
  requestCardDetails: request => {
    return [
      {
        label: 'Request Id:',
        value: request.requestId.toUpperCase(),
      },
      {
        label: 'Device:',
        value: request.device,
      },
      {
        label: 'Brand:',
        value: request.brand,
      },
      {
        label: 'Status:',
        value: request.status,
      },
      {
        label: 'Created:',
        value: timeUtils.convertCreatedDateNoDay(request.createdAt.seconds),
      },
    ];
  },
  requestDetails: request => {
    return [
      {
        label: 'Request Id',
        value: request.requestId.toUpperCase(),
      },
      {
        label: 'User Id',
        value: request.uid.toUpperCase(),
      },
      {
        label: 'Name',
        value: request?.name,
      },
      {
        label: 'Email',
        value: request?.email,
      },
      {
        label: 'Position',
        value: request?.position,
      },
      {
        label: 'Office',
        value: request?.office,
      },
      {
        label: 'Device Type',
        value: request?.device,
      },
      {
        label: 'Brand',
        value: request?.brand,
      },
      {
        label: 'Brand Model',
        value: request?.model || 'N/A',
      },
      {
        label: 'Serial Number',
        value: request?.serial || 'N/A',
      },
      {
        label: 'Property Number',
        value: request?.property || 'N/A',
      },
      {
        label: 'Status',
        value: request.status,
      },
      {
        label: 'Updated',
        value: request.updatedAt?.seconds
          ? timeUtils.getTimeAgo(request.updatedAt.seconds)
          : 'N/A',
      },
      {
        label: 'Date Requested',
        value: timeUtils.convertCreatedDate(request?.createdAt?.seconds),
      },
      {
        label: 'Defects/Complaints',
        value: request?.complaints,
      },
    ];
  },
  actionTakenDetails: request => {
    return [
      {
        label: 'Action taken',
        value: request.actionTaken,
      },
      {
        label: 'Recommendation',
        value: request.actionTaken || "N/A",
      },
      {
        label: 'Equipment Type',
        value: request.equipment,
      },
      {
        label: 'Date completed',
        value: timeUtils.convertCreatedDate(request?.completedAt?.seconds),
      },
    ];
  },
  filteredList: (search, requests, tab) => {
    return (search || requests || []).filter(item => {
      return item.status.toLowerCase().includes(tab.toLocaleLowerCase());
    });
  },
};
